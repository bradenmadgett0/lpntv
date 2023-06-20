/* eslint-disable react-native/no-inline-styles */
import styled from '@emotion/native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {formatCurrency} from '../util/currency';
import {FlatList} from 'react-native';

interface ProductEntryProps {
  title: string;
  image: any;
  variants: any[];
  itemsSold: {[key: string]: number};
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

const ProductEntryWrapper = styled.View`
  flex: 1;
  height: 320px;
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
  border: ${props =>
    props.selected ? '5px solid #7255e9' : '2px solid black'};
  margin-left: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const ProductEntry = ({
  title,
  image,
  variants,
  itemsSold,
}: ProductEntryProps): JSX.Element => {
  const [currentVariant, setCurrentVariant] = useState(variants?.[0]);

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
            renderItem={({item, index}) => (
              <VariantButton
                onPress={() => setCurrentVariant(item)}
                selected={currentVariant?.id === item.id}>
                <ProductLabel>{index + 1}</ProductLabel>
              </VariantButton>
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
                  {`${itemsSold[currentVariant?.sku] || 0} sold`}
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
