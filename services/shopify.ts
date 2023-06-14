import Config from 'react-native-config';
import {OrdersResponse, ProductsResponse} from '../types/shopify';

export const fetchShopifyOrders = async (): Promise<OrdersResponse> => {
  console.log(
    `https://${Config.SHOPIFY_KEY}:${Config.SHOPIFY_PASS}@${Config.SHOPIFY_BASE_URL}/admin/api/2020-04/orders.json`,
  );
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

export const fetchShopifyProducts = async (): Promise<ProductsResponse> => {
  const resp = await fetch(
    `https://${Config.SHOPIFY_KEY}:${Config.SHOPIFY_PASS}@${Config.SHOPIFY_BASE_URL}/admin/api/2020-04/products.json`,
  ).catch(e => {
    throw new Error(e);
  });

  if (resp.ok) {
    return resp.json();
  }

  throw new Error('Failed to fetch products');
};
