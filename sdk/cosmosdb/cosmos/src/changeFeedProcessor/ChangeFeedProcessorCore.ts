import { ChangeFeedProcessor } from "./ChangeFeedProcessor";
import { Container } from "../client";
import { ChangeFeedProcessorOptions } from "./ChangeFeedProcessOptions";

import { EventEmitter } from "events";

/**
 * Not for public consumption
 *
 * Internal implementaiton of ChangeFeedProcessor
 *
 * @private
 * @ignore
 */
class ChangeFeedProcessorCore extends EventEmitter implements ChangeFeedProcessor {
  private options: Readonly<ChangeFeedProcessorOptions>;
  public async stop(): Promise<ChangeFeedProcessor> {
    throw new Error("Not implemented");
  }
  public async start(): Promise<ChangeFeedProcessor> {
    throw new Error("Not implemented");
  }

  public async init(): Promise<ChangeFeedProcessor> {
    throw new Error("Not implemented");
  }

  constructor(
    private targetContainer: Container,
    private leaseContainer: Container,
    private processorName: string,
    private instanceName: string,
    options: ChangeFeedProcessorOptions
  ) {
    super();
    this.options = Object.freeze({ ...options });
  }
}

async function ensureContainerExists(container: Container, argumentName?: string) {
  try {
    await container.read();
  } catch (e) {
    let message = "Could not read " + (argumentName || "container") + ".";
    if (e.code && e.code === 404) {
      const toThrow = new Error(
        message +
          " Please check that the container exists. \nCause:\n" +
          JSON.stringify(e, null, "")
      );
      (toThrow as any).code = e.code;
    } else {
      const toThrow = new Error(message + "\nCause:\n" + JSON.stringify(e, null, ""));
      (toThrow as any).code = e ? e.code : undefined;
    }
  }
}

export async function createChangeFeedProcessor(
  targetContainer: Container,
  leaseContainer: Container,
  processorName: string,
  instanceName: string,
  options?: ChangeFeedProcessorOptions
): Promise<ChangeFeedProcessor> {
  // Validate inputs
  if (!targetContainer || !(targetContainer instanceof Container)) {
    throw new Error("targetContainer must be an instance of Container");
  }
  if (!leaseContainer || !(leaseContainer instanceof Container)) {
    throw new Error("leaseContainer must be an instance of Container");
  }
  if (!instanceName || typeof instanceName !== "string") {
    throw new Error("instanceName must be a string");
  }

  // Check that the containers exist (common issue is that lease container doesn't exist)
  await ensureContainerExists(targetContainer, "targetContainer");
  await ensureContainerExists(leaseContainer, "leaseContainer");

  // Create and start the change feed processor
  const cfp = new ChangeFeedProcessorCore(
    targetContainer,
    leaseContainer,
    processorName,
    instanceName,
    options
  );
  cfp.init();
  return cfp;
}
