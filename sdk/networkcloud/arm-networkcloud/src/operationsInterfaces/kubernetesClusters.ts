/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  KubernetesCluster,
  KubernetesClustersListBySubscriptionOptionalParams,
  KubernetesClustersListByResourceGroupOptionalParams,
  KubernetesClustersGetOptionalParams,
  KubernetesClustersGetResponse,
  KubernetesClustersCreateOrUpdateOptionalParams,
  KubernetesClustersCreateOrUpdateResponse,
  KubernetesClustersDeleteOptionalParams,
  KubernetesClustersUpdateOptionalParams,
  KubernetesClustersUpdateResponse,
  KubernetesClusterRestartNodeParameters,
  KubernetesClustersRestartNodeOptionalParams,
  KubernetesClustersRestartNodeResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a KubernetesClusters. */
export interface KubernetesClusters {
  /**
   * Get a list of Kubernetes clusters in the provided subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: KubernetesClustersListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<KubernetesCluster>;
  /**
   * Get a list of Kubernetes clusters in the provided resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: KubernetesClustersListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<KubernetesCluster>;
  /**
   * Get properties of the provided the Kubernetes cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param kubernetesClusterName The name of the Kubernetes cluster.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersGetOptionalParams
  ): Promise<KubernetesClustersGetResponse>;
  /**
   * Create a new Kubernetes cluster or update the properties of the existing one.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param kubernetesClusterName The name of the Kubernetes cluster.
   * @param kubernetesClusterParameters The request body.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    kubernetesClusterName: string,
    kubernetesClusterParameters: KubernetesCluster,
    options?: KubernetesClustersCreateOrUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<KubernetesClustersCreateOrUpdateResponse>,
      KubernetesClustersCreateOrUpdateResponse
    >
  >;
  /**
   * Create a new Kubernetes cluster or update the properties of the existing one.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param kubernetesClusterName The name of the Kubernetes cluster.
   * @param kubernetesClusterParameters The request body.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    kubernetesClusterName: string,
    kubernetesClusterParameters: KubernetesCluster,
    options?: KubernetesClustersCreateOrUpdateOptionalParams
  ): Promise<KubernetesClustersCreateOrUpdateResponse>;
  /**
   * Delete the provided Kubernetes cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param kubernetesClusterName The name of the Kubernetes cluster.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Delete the provided Kubernetes cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param kubernetesClusterName The name of the Kubernetes cluster.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersDeleteOptionalParams
  ): Promise<void>;
  /**
   * Patch the properties of the provided Kubernetes cluster, or update the tags associated with the
   * Kubernetes cluster. Properties and tag updates can be done independently.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param kubernetesClusterName The name of the Kubernetes cluster.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<KubernetesClustersUpdateResponse>,
      KubernetesClustersUpdateResponse
    >
  >;
  /**
   * Patch the properties of the provided Kubernetes cluster, or update the tags associated with the
   * Kubernetes cluster. Properties and tag updates can be done independently.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param kubernetesClusterName The name of the Kubernetes cluster.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersUpdateOptionalParams
  ): Promise<KubernetesClustersUpdateResponse>;
  /**
   * Restart a targeted node of a Kubernetes cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param kubernetesClusterName The name of the Kubernetes cluster.
   * @param kubernetesClusterRestartNodeParameters The request body.
   * @param options The options parameters.
   */
  beginRestartNode(
    resourceGroupName: string,
    kubernetesClusterName: string,
    kubernetesClusterRestartNodeParameters: KubernetesClusterRestartNodeParameters,
    options?: KubernetesClustersRestartNodeOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<KubernetesClustersRestartNodeResponse>,
      KubernetesClustersRestartNodeResponse
    >
  >;
  /**
   * Restart a targeted node of a Kubernetes cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param kubernetesClusterName The name of the Kubernetes cluster.
   * @param kubernetesClusterRestartNodeParameters The request body.
   * @param options The options parameters.
   */
  beginRestartNodeAndWait(
    resourceGroupName: string,
    kubernetesClusterName: string,
    kubernetesClusterRestartNodeParameters: KubernetesClusterRestartNodeParameters,
    options?: KubernetesClustersRestartNodeOptionalParams
  ): Promise<KubernetesClustersRestartNodeResponse>;
}
