import React, {useMemo} from 'react';
import Products from './Products';
import {useQuery} from 'react-query';
import {queryKeys} from '../util/enums';
import {fetchShopifyOrders} from '../services/shopify';
import styled from '@emotion/native';
import {formatCurrency} from '../util/currency';

interface OrdersLabelProps {
  color?: string;
  fontSize?: number;
}

const OrdersInfo = styled.View`
  border-bottom-width: 1px;
  border-color: grey;
  padding: 16px;
  height: 60px;
`;

const OrdersLabel = styled.Text<OrdersLabelProps>`
  color: ${props => props.color ?? 'grey'};
  font-size: ${props => props.fontSize ?? '14px'};
  font-weight: bold;
`;

const Home = (): JSX.Element => {
  const {data: ordersData, isLoading: ordersLoading} = useQuery(
    queryKeys.ORDERS,
    () => fetchShopifyOrders(),
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

  return (
    <>
      {ordersLoading ? (
        <OrdersLabel>Loading orders...</OrdersLabel>
      ) : (
        <OrdersInfo>
          <OrdersLabel>Total of sales</OrdersLabel>
          <OrdersLabel fontSize={16}>{totalSales}</OrdersLabel>
        </OrdersInfo>
      )}

      <Products />
    </>
  );
};

export default Home;
