import Config from 'react-native-config';
import {OrdersResponse, ProductsResponse} from '../types/shopify';

export const fetchShopifyOrders = async (): Promise<OrdersResponse> => {
  const resp = await fetch(
    `https://${Config.SHOPIFY_KEY}:${Config.SHOPIFY_PASS}@${Config.SHOPIFY_BASE_URL}/admin/api/2020-04/orders.json`,
  ).catch(e => {
    throw new Error(e);
  });

  if (resp.ok) {
    return resp.json();
  }

  throw new Error('Failed to fetch orders');
};

export const fetchShopifyProducts = async (
  pageParam?: string,
): Promise<ProductsResponse> => {
  const resp = await fetch(
    pageParam ??
      `https://${Config.SHOPIFY_KEY}:${Config.SHOPIFY_PASS}@${Config.SHOPIFY_BASE_URL}/admin/api/2020-04/products.json?limit=10`,
  ).catch(e => {
    throw new Error(e);
  });

  if (resp.ok) {
    const linkHeader = resp.headers.get('Link');
    // eslint-disable-next-line quotes
    const pagesRemaining = linkHeader && linkHeader.includes(`rel="next"`);
    let nextUrl;
    if (pagesRemaining) {
      nextUrl = linkHeader.match(/(?<=<)([\S]*)(?=>; rel="next")/i);
    }

    return {
      products: await resp.json().then(res => res.products),
      nextLink: nextUrl?.[0],
    };
  }

  throw new Error('Failed to fetch products');
};
