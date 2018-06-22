// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as assert from "assert";
import { HttpHeaders } from "../../../lib/httpHeaders";
import { HttpOperationResponse } from "../../../lib/httpOperationResponse";
import { RequestPolicy, RequestPolicyOptions } from "../../../lib/policies/requestPolicy";
import { SerializationPolicy, serializationPolicy } from "../../../lib/policies/serializationPolicy";
import { WebResource } from "../../../lib/webResource";
import { HttpClient } from '../../../lib/msRest';

describe("serializationPolicy", () => {
  const mockPolicy: RequestPolicy = {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      return Promise.resolve({
        request: request,
        status: 200,
        headers: new HttpHeaders()
      });
    }
  };

  it(`should not modify a request that has no request body mapper`, async () => {
    const serializationPolicy = new SerializationPolicy(mockPolicy, new RequestPolicyOptions());

    const request = new WebResource();
    request.body = "hello there!";

    await serializationPolicy.sendRequest(request);
    assert.strictEqual(request.body, "hello there!");
  });

  it("should parse a JSON response body", async function() {
    const request = new WebResource();
    const mockClient: HttpClient = {
      sendRequest: req => Promise.resolve({
        request: req,
        status: 200,
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        bodyAsText: "[123, 456, 789]"
      })
    };

    const policy = serializationPolicy()(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepStrictEqual(response.parsedBody, [123,456,789]);
  });

  it("should parse a JSON response body with a charset specified in Content-Type", async function() {
    const request = new WebResource();
    const mockClient: HttpClient = {
      sendRequest: req => Promise.resolve({
        request: req,
        status: 200,
        headers: new HttpHeaders({ "Content-Type": "application/json;charset=UTF-8" }),
        bodyAsText: "[123, 456, 789]"
      })
    };

    const policy = serializationPolicy()(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepStrictEqual(response.parsedBody, [123,456,789]);
  });

  it("should parse a JSON response body with an uppercase Content-Type", async function() {
    const request = new WebResource();
    const mockClient: HttpClient = {
      sendRequest: req => Promise.resolve({
        request: req,
        status: 200,
        headers: new HttpHeaders({ "Content-Type": "APPLICATION/JSON" }),
        bodyAsText: "[123, 456, 789]"
      })
    };

    const policy = serializationPolicy()(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepStrictEqual(response.parsedBody, [123,456,789]);
  });

  it("should parse a JSON response body with a missing Content-Type", async function() {
    const request = new WebResource();
    const mockClient: HttpClient = {
      sendRequest: req => Promise.resolve({
        request: req,
        status: 200,
        headers: new HttpHeaders(),
        bodyAsText: "[123, 456, 789]"
      })
    };

    const policy = serializationPolicy()(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepStrictEqual(response.parsedBody, [123,456,789]);
  });
});