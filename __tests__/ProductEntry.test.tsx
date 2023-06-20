import React from 'react';
import ProductEntry from '../components/ProductEntry';
import {fireEvent, render} from '@testing-library/react-native';
import mockProducts from './mockJSON/mockProducts.json';
import mockItemsSold from './mockJSON/mockItemsSold.json';

const mockProduct = mockProducts.products[0];
const mockProductWithVariants = mockProducts.products[11];

describe('ProductEntry tests', () => {
  test('Should correctly render item', () => {
    const {getByText, getByTestId} = render(
      <ProductEntry
        title="Test item"
        image={mockProduct.image}
        variants={mockProduct.variants}
        itemsSold={mockItemsSold}
      />,
    );

    getByText('Test item');
    getByText('Default Title');
    getByText('Sold out');
    getByText('0 sold');
    getByText('Free');
    getByText('No image');
    getByTestId('39551534006374');
  });

  test('Should correctly switch variant', () => {
    const {getByText, getByTestId} = render(
      <ProductEntry
        title="Test item"
        image={mockProductWithVariants.image}
        variants={mockProductWithVariants.variants}
        itemsSold={mockItemsSold}
      />,
    );

    getByText('Small / Red');
    getByText('Sold out');
    getByText('22 sold');

    getByTestId('28000476495974');
    getByTestId('28000476528742');
    getByTestId('28000476594278');
    const variantButton = getByTestId('28000476627046');

    fireEvent.press(variantButton);

    getByText('81 left');
    getByText('3 sold');
    getByText('Medium / Blue');
  });
});
