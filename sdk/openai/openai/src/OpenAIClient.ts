// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  OpenAIClientOptions,
  OpenAIContext,
  beginAzureBatchImageGeneration,
  createOpenAI,
  getAzureBatchImageGenerationOperationStatus,
  getChatCompletions,
  getCompletions,
  getEmbeddings,
  listChatCompletions,
  listCompletions,
} from "./api/index.js";
import {
  ChatCompletions,
  ChatMessage,
  Completions,
  Embeddings,
  ImageGenerationResponse,
} from "./models/models.js";
import {
  GetAzureBatchImageGenerationOperationStatusOptions,
  GetCompletionsOptions,
  GetEmbeddingsOptions,
  ImageGenerationOptions,
} from "./models/options.js";
import { GetChatCompletionsOptions } from "./api/models.js";

export { OpenAIClientOptions } from "./api/OpenAIContext.js";

export class OpenAIClient {
  private _client: OpenAIContext;
  private _isAzure = false;

  /**
   * Initializes an instance of OpenAIClient for use with an Azure OpenAI resource.
   * @param endpoint - The URI for an Azure OpenAI resource, including protocol and hostname.
   *                 For example: https://my-resource.openai.azure.com.
   * @param credential - A key credential used to authenticate to an Azure OpenAI resource.
   * @param options - The options for configuring the client.
   * @remarks
   *   This constructor initializes an OpenAIClient object that can only be used with Azure OpenAI resources.
   *   To use OpenAIClient with a non-Azure OpenAI inference endpoint, use a constructor that accepts a non-Azure OpenAI API key instead.
   */
  constructor(endpoint: string, credential: KeyCredential, options?: OpenAIClientOptions);
  /**
   * Initializes an instance of OpenAIClient for use with an Azure OpenAI resource.
   * @param endpoint - The URI for an Azure OpenAI resource, including protocol and hostname.
   *                 For example: https://my-resource.openai.azure.com.
   * @param credential - A token credential used to authenticate with an Azure OpenAI resource.
   * @param options - The options for configuring the client.
   */
  constructor(endpoint: string, credential: TokenCredential, options?: OpenAIClientOptions);
  /**
   * Initializes an instance of OpenAIClient for use with the non-Azure OpenAI endpoint.
   * @param openAiApiKey - The API key to use when connecting to the non-Azure OpenAI endpoint.
   * @param options - The options for configuring the client.
   * @remarks
   *   OpenAIClient objects initialized with this constructor can only be used with the non-Azure OpenAI inference endpoint.
   *   To use OpenAIClient with an Azure OpenAI resource, use a constructor that accepts a resource URI and Azure authentication credential instead.
   */
  constructor(openAiApiKey: KeyCredential, options?: OpenAIClientOptions);
  constructor(
    endpointOrOpenAiKey: string | KeyCredential,
    credOrOptions: KeyCredential | TokenCredential | OpenAIClientOptions = {},
    options: OpenAIClientOptions = {}
  ) {
    let opts: OpenAIClientOptions;
    let endpoint: string;
    let cred: KeyCredential | TokenCredential;
    if (isCred(credOrOptions)) {
      endpoint = endpointOrOpenAiKey as string;
      cred = credOrOptions;
      opts = options;
      this._isAzure = true;
    } else {
      endpoint = createOpenAIEndpoint(1);
      cred = endpointOrOpenAiKey as KeyCredential;
      const { credentials, ...restOpts } = credOrOptions;
      opts = {
        credentials: {
          apiKeyHeaderName: credentials?.apiKeyHeaderName ?? "Authorization",
          scopes: credentials?.scopes,
        },
        ...restOpts,
      };
    }

    this._client = createOpenAI(endpoint, cred, {
      ...opts,
      ...(this._isAzure
        ? {}
        : {
            additionalPolicies: [
              ...(opts.additionalPolicies ?? []),
              {
                position: "perCall",
                policy: {
                  name: "openAiEndpoint",
                  sendRequest: (request, next) => {
                    const obj = new URL(request.url);
                    const parts = obj.pathname.split("/");
                    obj.pathname = `/${parts[1]}/${parts.slice(5).join("/")}`;
                    obj.searchParams.delete("api-version");
                    request.url = obj.toString();
                    return next(request);
                  },
                },
              },
            ],
          }),
    });
  }

  /**
   * Returns textual completions as configured for a given prompt.
   * @param deploymentName - Specifies either the model deployment name (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param prompt - The prompt to use for this request.
   * @param options - The options for this completions request.
   * @returns The completions for the given prompt.
   */
  getCompletions(
    deploymentName: string,
    prompt: string[],
    options: GetCompletionsOptions = { requestOptions: {} }
  ): Promise<Completions> {
    this.setModel(deploymentName, options);
    return getCompletions(this._client, prompt, deploymentName, options);
  }

  /**
   * Lists the completions tokens as they become available for a given prompt.
   * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param prompt - The prompt to use for this request.
   * @param options - The completions options for this completions request.
   * @returns An asynchronous iterable of completions tokens.
   */
  listCompletions(
    deploymentName: string,
    prompt: string[],
    options: GetCompletionsOptions = {}
  ): AsyncIterable<Omit<Completions, "usage">> {
    this.setModel(deploymentName, options);
    return listCompletions(this._client, prompt, deploymentName, options);
  }

  /**
   * Return the computed embeddings for a given prompt.
   * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param input - The prompt to use for this request.
   * @param options - The embeddings options for this embeddings request.
   * @returns The embeddings for the given prompt.
   */
  getEmbeddings(
    deploymentName: string,
    input: string[],
    options: GetEmbeddingsOptions = { requestOptions: {} }
  ): Promise<Embeddings> {
    this.setModel(deploymentName, options);
    return getEmbeddings(this._client, input, deploymentName, options);
  }

  /**
   * Get chat completions for provided chat context messages.
   * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param messages - The chat context messages to use for this request.
   * @param options - The chat completions options for this completions request.
   * @returns The chat completions for the given chat context messages.
   */
  getChatCompletions(
    deploymentName: string,
    messages: ChatMessage[],
    options: GetChatCompletionsOptions = { requestOptions: {} }
  ): Promise<ChatCompletions> {
    this.setModel(deploymentName, options);
    return getChatCompletions(this._client, messages, deploymentName, options);
  }

  /**
   * Lists the chat completions tokens as they become available for a chat context.
   * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param messages - The chat context messages to use for this request.
   * @param options - The chat completions options for this chat completions request.
   * @returns An asynchronous iterable of chat completions tokens.
   */
  listChatCompletions(
    deploymentName: string,
    messages: ChatMessage[],
    options: GetChatCompletionsOptions = { requestOptions: {} }
  ): AsyncIterable<ChatCompletions> {
    this.setModel(deploymentName, options);
    return listChatCompletions(this._client, messages, deploymentName, options);
  }

  /** Returns the status of the images operation */
  getAzureBatchImageGenerationOperationStatus(
    operationId: string,
    options: GetAzureBatchImageGenerationOperationStatusOptions = {
      requestOptions: {},
    }
  ): Promise<ImageGenerationResponse> {
    return getAzureBatchImageGenerationOperationStatus(this._client, operationId, options);
  }

  /** Starts the generation of a batch of images from a text caption */
  beginAzureBatchImageGeneration(
    prompt: string,
    options: ImageGenerationOptions = { requestOptions: {} }
  ): Promise<ImageGenerationResponse> {
    return beginAzureBatchImageGeneration(this._client, prompt, options);
  }

  /**
   * Starts the generation of a batch of images from a text caption
   * @param prompt - The prompt to use for this request.
   * @param options - The options for this image request.
   * @returns The image generation response (containing url or base64 data).
   */
  getImages(
    prompt: string,
    options: ImageGenerationOptions = { requestOptions: {} }
  ): Promise<ImageGenerationResponse> {
    return beginAzureBatchImageGeneration(this._client, prompt, options);
  }

  private setModel(model: string, options: { model?: string }): void {
    if (!this._isAzure) {
      options.model = model;
    }
  }
}

function createOpenAIEndpoint(version: number): string {
  return `https://api.openai.com/v${version}`;
}

function isCred(cred: Record<string, any>): cred is TokenCredential | KeyCredential {
  return isTokenCredential(cred) || cred.key !== undefined;
}
