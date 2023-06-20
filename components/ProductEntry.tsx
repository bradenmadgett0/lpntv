/* eslint-disable react-native/no-inline-styles */
import styled from '@emotion/native';
import React, {useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {formatCurrency} from '../util/currency';
import {FlatList} from 'react-native';

interface ProductEntryProps {
  title: string;
  image: any;
  variants: any[];
  numPurchased: number;
  id: string;
}

interface LabelProps {
  color?: string;
  fontSize?: string;
  padding?: number;
}

interface RowProps {
  flex?: number;
  justify?: string;
  flexDirection?: string;
}

export const PRODUCT_ENTRY_HEIGHT = 340;

const ProductEntryWrapper = styled.View`
  width: 100%;
  height: ${`${PRODUCT_ENTRY_HEIGHT}px`};
  padding: 4px;
`;

const ProductEntryContent = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  border: 1px solid grey;
`;

const ImageArea = styled.View`
  width: 100%;
  flex: 1;
`;

const ProductInfoArea = styled.View`
  width: 100%;
  flex: 1;
  border-top-width: 1px;
  border-color: grey;
`;

const NoImagePlaceHolder = styled.View`
  width: 100%;
  height: 100%;
  background-color: lightgray;
  align-items: center;
  justify-content: center;
`;

const NoImagePlaceHolderText = styled.Text`
  color: grey;
`;

const ProductLabel = styled.Text<LabelProps>`
  font-weight: bold;
  padding: ${props => props.padding ?? '0px'};
  color: ${props => props.color ?? 'black'};
  font-size: ${props => props.fontSize ?? '13px'};
  flex-wrap: wrap;
`;

const ProductTextInfo = styled.View`
  padding-left: 8px;
  padding-right: 8px;
  flex: 1;
`;

const PricePill = styled.View`
  border: 2px solid #7255e9;
  padding: 4px;
  align-self: flex-start;
`;

const Row = styled.View<RowProps>`
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 8px;
  justify-content: space-between;
  align-items: center;
`;

const PricingInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const VariantButton = styled.TouchableOpacity<{selected: boolean}>`
  width: 30px;
  height: 30px;
  background-color: orange;
  border: ${props => (props.selected ? '3px solid #7255e9' : 'none')};
  margin-left: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
`;

const ProductEntry = ({
  title,
  image,
  variants,
  numPurchased,
  id,
}: ProductEntryProps): JSX.Element => {
  const lastProductEntryId = useRef(id); // For use with FlashList recycling
  const [currentVariant, setCurrentVariant] = useState(variants?.[0]);

  // For use with FlashList recycling
  if (id !== lastProductEntryId.current) {
    lastProductEntryId.current = id;
    setCurrentVariant(variants?.[0]);
  }

  return (
    <ProductEntryWrapper>
      <ProductEntryContent>
        <ImageArea>
          {image?.src ? (
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={{
                uri: image.src,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <NoImagePlaceHolder>
              <NoImagePlaceHolderText>No image</NoImagePlaceHolderText>
            </NoImagePlaceHolder>
          )}
        </ImageArea>

        <ProductInfoArea>
          <FlatList
            horizontal
            data={variants}
            style={{flexGrow: 0}}
            renderItem={({item}) => (
              <VariantButton
                onPress={() => setCurrentVariant(item)}
                selected={currentVariant?.id === item.id}
              />
            )}
            keyExtractor={item => item.id}
          />

          <ProductTextInfo>
            <ProductLabel padding={2} color="grey">
              {currentVariant.title}
            </ProductLabel>
            <ProductLabel padding={2}>{title}</ProductLabel>

            <PricingInfo>
              <Row>
                <PricePill>
                  <ProductLabel color="#7255e9" fontSize="12px">
                    {currentVariant.price > 0
                      ? formatCurrency(currentVariant.price)
                      : 'Free'}
                  </ProductLabel>
                </PricePill>
                <ProductLabel padding={2} color="grey">
                  {currentVariant.inventory_quantity > 0
                    ? `${currentVariant.inventory_quantity} left`
                    : 'Sold out'}
                </ProductLabel>

                <ProductLabel padding={2} color="grey">
                  {`${numPurchased} sold`}
                </ProductLabel>
              </Row>
            </PricingInfo>
          </ProductTextInfo>
        </ProductInfoArea>
      </ProductEntryContent>
    </ProductEntryWrapper>
  );
};

export default ProductEntry;
