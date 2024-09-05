/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Creates or updates a billing subscription by its alias ID.  The operation is supported for seat based billing subscriptions.
 *
 * @summary Creates or updates a billing subscription by its alias ID.  The operation is supported for seat based billing subscriptions.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingSubscriptionAliasCreateOrUpdate.json
 */
async function billingSubscriptionAliasCreateOrUpdate() {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const aliasName = "c356b7c7-7545-4686-b843-c1a49cf853fc";
  const parameters = {
    billingFrequency: "P1M",
    displayName: "Subscription 3",
    quantity: 1,
    skuId: "0001",
    termDuration: "P1M",
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingSubscriptionsAliases.beginCreateOrUpdateAndWait(
    billingAccountName,
    aliasName,
    parameters,
  );
  console.log(result);
}

async function main() {
  billingSubscriptionAliasCreateOrUpdate();
}

main().catch(console.error);
