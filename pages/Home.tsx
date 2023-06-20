/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
import {useQuery} from 'react-query';
import {queryKeys} from '../util/enums';
import {fetchShopifyOrders, fetchShopifyProducts} from '../services/shopify';
import styled from '@emotion/native';
import {formatCurrency} from '../util/currency';
import {ProductsResponse} from '../types/shopify';
import {FlatList, Text} from 'react-native';
import ProductEntry from '../components/ProductEntry';

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

  const {data: productData, isLoading} = useQuery<ProductsResponse>(
    queryKeys.PRODUCTS,
    () => fetchShopifyProducts(),
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
        if (item?.sku) {
          if (item.sku in itemMap) {
            itemMap[item.sku] = itemMap[item.sku] + item.quantity;
          } else {
            itemMap[item.sku] = item.quantity;
          }
        }
      });
    });

    return itemMap;
  }, [ordersData]);

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
          <FlatList
            numColumns={2}
            data={productData?.products || []}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ProductEntry
                title={item.title}
                image={item.image}
                variants={item.variants}
                itemsSold={itemsSoldList}
              />
            )}
          />
        )}
      </ProductsView>
    </HomeContent>
  );
};

export default Home;
