import {formatCurrency} from '../../util/currency';

describe('Utility method tests', () => {
  test('Format currency should convert decimal to currency string', () => {
    expect(formatCurrency('15.21')).toBe('$15.21');
  });
});
