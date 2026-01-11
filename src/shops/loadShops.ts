import shopsConfig from "../config/shops.json";
import type { Shop, ShopConfig } from "./types";

function assertValidShopConfig(shop: ShopConfig): void {
  if (!shop.id || !shop.name) throw new Error("Invalid shop config: missing id/name");
  if (!shop.homeUrl || !shop.searchUrlTemplate)
    throw new Error(`Invalid shop config for "${shop.id}": missing URLs`);
  if (!shop.searchUrlTemplate.includes("{q}"))
    throw new Error(`Invalid shop config for "${shop.id}": searchUrlTemplate must include "{q}"`);
}

export function loadEnabledShops(): Shop[] {
  const configs = shopsConfig as ShopConfig[];

  return configs
    .filter((s) => s.enabled)
    .map((s) => {
      assertValidShopConfig(s);
      return {
        id: s.id,
        name: s.name,
        homeUrl: s.homeUrl,
        buildSearchUrl: (query: string) => {
          const q = encodeURIComponent(query.trim());
          return s.searchUrlTemplate.split("{q}").join(q);
        }
      };
    });
}

