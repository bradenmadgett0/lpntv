/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
// import Products from './Products';
import {useQuery} from 'react-query';
import {queryKeys} from '../util/enums';
import {fetchShopifyOrders, fetchShopifyProducts} from '../services/shopify';
import styled from '@emotion/native';
import {formatCurrency} from '../util/currency';
import {ProductsResponse} from '../types/shopify';
import {Text} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import ProductEntry, {PRODUCT_ENTRY_HEIGHT} from './ProductEntry';

interface OrdersLabelProps {
  color?: string;
  fontSize?: number;
}

const HomeContent = styled.View`
  height: 100%;
`;

const OrdersInfo = styled.View`
  border-bottom-width: 1px;
  border-color: grey;
  padding: 16px;
  height: 64px;
  align-items: center;
`;

const OrdersLabel = styled.Text<OrdersLabelProps>`
  color: ${props => props.color ?? 'grey'};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '14px')};
  font-weight: bold;
`;

const ProductsView = styled.View`
  flex: 1;
  width: 100%;
`;

const Home = (): JSX.Element => {
  const {data: ordersData, isLoading: ordersLoading} = useQuery(
    queryKeys.ORDERS,
    () => fetchShopifyOrders(),
  );

  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery<ProductsResponse>(queryKeys.PRODUCTS, () =>
    fetchShopifyProducts(),
  );

  const totalSales = useMemo(() => {
    if (ordersData?.orders && ordersData?.orders.length > 0) {
      var runningTotal = 0;
      ordersData.orders.forEach(order => {
        runningTotal += Number(order.current_total_price);
      });
      return formatCurrency(runningTotal.toString());
    }
    return formatCurrency('0.00');
  }, [ordersData]);

  const itemsSoldList = useMemo(() => {
    let itemMap: {[key: string]: number} = {};

    ordersData?.orders?.forEach(order => {
      order?.line_items?.forEach((item: any) => {
        if (item?.product_id) {
          if (item.product_id in itemMap) {
            itemMap[item.product_id] = itemMap[item.product_id] + 1;
          } else {
            itemMap[item.product_id] = 1;
          }
        } else {
          console.log("NULL", item);
        }
      });
    });

    console.log(itemMap);
    return itemMap;
  }, [ordersData]);

  console.log(itemsSoldList);

  return (
    <HomeContent>
      {ordersLoading ? (
        <OrdersLabel>Loading orders...</OrdersLabel>
      ) : (
        <OrdersInfo>
          <OrdersLabel>Total of sales</OrdersLabel>
          <OrdersLabel fontSize={18} color="black">
            {totalSales}
          </OrdersLabel>
        </OrdersInfo>
      )}

      <ProductsView>
        {isLoading ? (
          <Text>Loading products...</Text>
        ) : (
          <FlashList
            data={productData?.products || []}
            renderItem={({item}) => (
              <ProductEntry
                title={item.title}
                image={item.image}
                variants={item.variants}
                numPurchased={itemsSoldList[item.product_id] || 0}
                id={item.id}
              />
            )}
            contentContainerStyle={{
              padding: 8,
            }}
            estimatedItemSize={PRODUCT_ENTRY_HEIGHT}
            numColumns={2}
          />
        )}
      </ProductsView>
    </HomeContent>
  );
};

export default Home;
