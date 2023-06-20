/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {useQuery} from 'react-query';
import {fetchShopifyProducts} from '../services/shopify';
import {queryKeys} from '../util/enums';
import {ProductsResponse} from '../types/shopify';
import {FlashList} from '@shopify/flash-list';
import styled from '@emotion/native';
import ProductEntry, {PRODUCT_ENTRY_HEIGHT} from './ProductEntry';

const ProductsView = styled.View`
  flex: 1;
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
              image={item.image}
              variants={item.variants}
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
  );
};

export default Products;
