export interface IWebhooksState {
  isLoading: boolean;
}

export interface IWebhooksData {
  id: string;
  platform: string;
  category: string;
  active: boolean;
  events: number;
}
