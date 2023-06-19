import styled from '@emotion/native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {formatCurrency} from '../util/currency';

interface ProductEntryProps {
  title: string;
  images: any[];
  variants: any[];
}

interface LabelProps {
  color?: string;
  fontSize?: string;
  padding?: number;
}

interface RowProps {
  flex?: number;
  justify?: string;
}

const ProductEntryWrapper = styled.View`
  width: 100%;
  height: 260px;
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
  flex: 2;
`;

const ProductInfoArea = styled.View`
  width: 100%;
  flex: 1;
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
  font-size: ${props => props.fontSize ?? '14px'};
`;

const PricePill = styled.View`
  border: 2px solid #7255e9;
  padding: 4px;
`;

const Row = styled.View<RowProps>`
  flex: ${props => props.flex ?? 1};
  padding: 6px;
  flex-direction: row;
  justify-content: ${props => props.justify ?? 'flex-start'};
  flex-wrap: wrap;
`;

const ProductEntry = ({
  title,
  images,
  variants,
}: ProductEntryProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentVariant, setCurrentVariant] = useState(variants?.[0]); // Could add variant selector to make use of this state
  console.log(images[0], images[0]?.src);
  const imageUrl = images[0]?.src;
  return (
    <ProductEntryWrapper>
      <ProductEntryContent>
        <ImageArea>
          {imageUrl ? (
            <FastImage
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: '100%', height: '100%'}}
              source={{
                uri: imageUrl,
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
          <Row flex={2}>
            <ProductLabel padding={2}>{title}</ProductLabel>
          </Row>
          {currentVariant && (
            <Row justify="space-between">
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
            </Row>
          )}
        </ProductInfoArea>
      </ProductEntryContent>
    </ProductEntryWrapper>
  );
};

export default ProductEntry;
