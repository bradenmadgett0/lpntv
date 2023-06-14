import styled from '@emotion/native';
import React from 'react';
import FastImage from 'react-native-fast-image';

interface ProductEntryProps {
  title: string;
  images: any[];
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

const ProductLabel = styled.Text`
  font-weight: bold;
  padding: 8px;
`;

const ProductEntry = ({title, images}: ProductEntryProps): JSX.Element => {
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
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <NoImagePlaceHolder>
              <NoImagePlaceHolderText>No image</NoImagePlaceHolderText>
            </NoImagePlaceHolder>
          )}
        </ImageArea>
        <ProductInfoArea>
          <ProductLabel>{title}</ProductLabel>
        </ProductInfoArea>
      </ProductEntryContent>
    </ProductEntryWrapper>
  );
};

export default ProductEntry;
