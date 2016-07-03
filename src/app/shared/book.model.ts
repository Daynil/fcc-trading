export interface Book {
  id: string;
  title: string;
  link: string;
  thumbnailUrl: string;
  owner: string;
  tradeRequester?: string;
}