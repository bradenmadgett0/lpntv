/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {useQuery} from 'react-query';
import {fetchShopifyProducts} from '../services/shopify';
import {queryKeys} from '../util/enums';
import {ProductsResponse} from '../types/shopify';
import {FlashList} from '@shopify/flash-list';
import styled from '@emotion/native';
import ProductEntry from './ProductEntry';

const ProductsView = styled.View`
  height: 100%;
  width: 100%;
`;

const Products = (): JSX.Element => {
  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery<ProductsResponse>(queryKeys.PRODUCTS, () =>
    fetchShopifyProducts(),
  );

  return (
    <ProductsView>
      {isLoading ? (
        <Text>Loading products...</Text>
      ) : (
        <FlashList
          data={productData?.products || []}
          renderItem={({item}) => (
            <ProductEntry
              title={item.title}
              images={item.images}
              variants={item.variants}
            />
          )}
          contentContainerStyle={{
            padding: 8,
          }}
          estimatedItemSize={180}
          numColumns={2}
        />
      )}
    </ProductsView>
  );
};

export default Products;
