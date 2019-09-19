export interface ChangeFeedProcessor {
  stop: () => Promise<ChangeFeedProcessor>;
}
