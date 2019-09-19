export interface ChangeFeedProcessorOptions {
  // Lease info
  /** The renewal interval for leases, measured in milliseconds. */
  leaseRenewalIntervalInMS?: number;
  /** The acquisition interval for leases, measured in milliseconds. */
  leaseAcquisitionIntervalInMS?: number;
  /** The expiration interval for leases, measured in milliseconds. */
  leaseExpirationIntervalInMS?: number;

  // Polling
  /**
   * The polling interval to check the feed for new changes, measured in milliseconds.
   *
   * This applies after a given poll yields no changes.
   */
  pollingIntervalInMS?: number;

  /**
   * The maximum number of items that a single page will contain from the backend.
   *
   * Note: this is the maximum number of items you'll receive, but it doesn't promise that you'll receive that number, even if you have more than the specified amount of changes.
   */
  pollingMaxPageCount?: number;
}
