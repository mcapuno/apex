export type ShopConfig = {
  id: string;
  name: string;
  enabled: boolean;
  homeUrl: string;
  searchUrlTemplate: string; // use "{q}" placeholder
};

export type Shop = {
  id: string;
  name: string;
  homeUrl: string;
  buildSearchUrl: (query: string) => string;
};

