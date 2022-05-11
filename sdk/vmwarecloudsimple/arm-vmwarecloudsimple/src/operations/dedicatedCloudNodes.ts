/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DedicatedCloudNodes } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { VMwareCloudSimple } from "../vMwareCloudSimple";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  DedicatedCloudNode,
  DedicatedCloudNodesListBySubscriptionNextOptionalParams,
  DedicatedCloudNodesListBySubscriptionOptionalParams,
  DedicatedCloudNodesListByResourceGroupNextOptionalParams,
  DedicatedCloudNodesListByResourceGroupOptionalParams,
  DedicatedCloudNodesListBySubscriptionResponse,
  DedicatedCloudNodesListByResourceGroupResponse,
  DedicatedCloudNodesGetOptionalParams,
  DedicatedCloudNodesGetResponse,
  DedicatedCloudNodesCreateOrUpdateOptionalParams,
  DedicatedCloudNodesCreateOrUpdateResponse,
  DedicatedCloudNodesDeleteOptionalParams,
  PatchPayload,
  DedicatedCloudNodesUpdateOptionalParams,
  DedicatedCloudNodesUpdateResponse,
  DedicatedCloudNodesListBySubscriptionNextResponse,
  DedicatedCloudNodesListByResourceGroupNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing DedicatedCloudNodes operations. */
export class DedicatedCloudNodesImpl implements DedicatedCloudNodes {
  private readonly client: VMwareCloudSimple;

  /**
   * Initialize a new instance of the class DedicatedCloudNodes class.
   * @param client Reference to the service client
   */
  constructor(client: VMwareCloudSimple) {
    this.client = client;
  }

  /**
   * Returns list of dedicate cloud nodes within subscription
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: DedicatedCloudNodesListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<DedicatedCloudNode> {
    const iter = this.listBySubscriptionPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listBySubscriptionPagingPage(options);
      }
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: DedicatedCloudNodesListBySubscriptionOptionalParams
  ): AsyncIterableIterator<DedicatedCloudNode[]> {
    let result = await this._listBySubscription(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: DedicatedCloudNodesListBySubscriptionOptionalParams
  ): AsyncIterableIterator<DedicatedCloudNode> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Returns list of dedicate cloud nodes within resource group
   * @param resourceGroupName The name of the resource group
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: DedicatedCloudNodesListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<DedicatedCloudNode> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByResourceGroupPagingPage(resourceGroupName, options);
      }
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: DedicatedCloudNodesListByResourceGroupOptionalParams
  ): AsyncIterableIterator<DedicatedCloudNode[]> {
    let result = await this._listByResourceGroup(resourceGroupName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByResourceGroupNext(
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: DedicatedCloudNodesListByResourceGroupOptionalParams
  ): AsyncIterableIterator<DedicatedCloudNode> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Returns list of dedicate cloud nodes within subscription
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: DedicatedCloudNodesListBySubscriptionOptionalParams
  ): Promise<DedicatedCloudNodesListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec
    );
  }

  /**
   * Returns list of dedicate cloud nodes within resource group
   * @param resourceGroupName The name of the resource group
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: DedicatedCloudNodesListByResourceGroupOptionalParams
  ): Promise<DedicatedCloudNodesListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec
    );
  }

  /**
   * Returns dedicated cloud node
   * @param resourceGroupName The name of the resource group
   * @param dedicatedCloudNodeName dedicated cloud node name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    dedicatedCloudNodeName: string,
    options?: DedicatedCloudNodesGetOptionalParams
  ): Promise<DedicatedCloudNodesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, dedicatedCloudNodeName, options },
      getOperationSpec
    );
  }

  /**
   * Returns dedicated cloud node by its name
   * @param resourceGroupName The name of the resource group
   * @param referer referer url
   * @param dedicatedCloudNodeName dedicated cloud node name
   * @param dedicatedCloudNodeRequest Create Dedicated Cloud Node request
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    referer: string,
    dedicatedCloudNodeName: string,
    dedicatedCloudNodeRequest: DedicatedCloudNode,
    options?: DedicatedCloudNodesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DedicatedCloudNodesCreateOrUpdateResponse>,
      DedicatedCloudNodesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<DedicatedCloudNodesCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        resourceGroupName,
        referer,
        dedicatedCloudNodeName,
        dedicatedCloudNodeRequest,
        options
      },
      createOrUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Returns dedicated cloud node by its name
   * @param resourceGroupName The name of the resource group
   * @param referer referer url
   * @param dedicatedCloudNodeName dedicated cloud node name
   * @param dedicatedCloudNodeRequest Create Dedicated Cloud Node request
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    referer: string,
    dedicatedCloudNodeName: string,
    dedicatedCloudNodeRequest: DedicatedCloudNode,
    options?: DedicatedCloudNodesCreateOrUpdateOptionalParams
  ): Promise<DedicatedCloudNodesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      referer,
      dedicatedCloudNodeName,
      dedicatedCloudNodeRequest,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete dedicated cloud node
   * @param resourceGroupName The name of the resource group
   * @param dedicatedCloudNodeName dedicated cloud node name
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    dedicatedCloudNodeName: string,
    options?: DedicatedCloudNodesDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, dedicatedCloudNodeName, options },
      deleteOperationSpec
    );
  }

  /**
   * Patches dedicated node properties
   * @param resourceGroupName The name of the resource group
   * @param dedicatedCloudNodeName dedicated cloud node name
   * @param dedicatedCloudNodeRequest Patch Dedicated Cloud Node request
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    dedicatedCloudNodeName: string,
    dedicatedCloudNodeRequest: PatchPayload,
    options?: DedicatedCloudNodesUpdateOptionalParams
  ): Promise<DedicatedCloudNodesUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        dedicatedCloudNodeName,
        dedicatedCloudNodeRequest,
        options
      },
      updateOperationSpec
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: DedicatedCloudNodesListBySubscriptionNextOptionalParams
  ): Promise<DedicatedCloudNodesListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec
    );
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: DedicatedCloudNodesListByResourceGroupNextOptionalParams
  ): Promise<DedicatedCloudNodesListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedCloudNodeListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.skipToken
  ],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedCloudNodeListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.skipToken
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes/{dedicatedCloudNodeName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedCloudNode
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dedicatedCloudNodeName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes/{dedicatedCloudNodeName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedCloudNode,
      headersMapper: Mappers.DedicatedCloudNodesCreateOrUpdateHeaders
    },
    201: {
      bodyMapper: Mappers.DedicatedCloudNode,
      headersMapper: Mappers.DedicatedCloudNodesCreateOrUpdateHeaders
    },
    202: {
      bodyMapper: Mappers.DedicatedCloudNode,
      headersMapper: Mappers.DedicatedCloudNodesCreateOrUpdateHeaders
    },
    204: {
      bodyMapper: Mappers.DedicatedCloudNode,
      headersMapper: Mappers.DedicatedCloudNodesCreateOrUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  requestBody: Parameters.dedicatedCloudNodeRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dedicatedCloudNodeName
  ],
  headerParameters: [
    Parameters.accept,
    Parameters.referer,
    Parameters.contentType
  ],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes/{dedicatedCloudNodeName}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.CsrpError,
      headersMapper: Mappers.DedicatedCloudNodesDeleteExceptionHeaders
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dedicatedCloudNodeName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes/{dedicatedCloudNodeName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedCloudNode
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  requestBody: Parameters.dedicatedCloudNodeRequest1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dedicatedCloudNodeName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedCloudNodeListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.skipToken
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedCloudNodeListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.skipToken
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
