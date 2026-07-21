import {
  products,
  Product,
  Cloths,
  Appliance
} from '../../scripts/data/products.js';

describe('products', () => {
  it('first product is a Product', () => {
    expect(products[0] instanceof Product).toBe(true);
  });

  it('second product is Clothing', () => {
    expect(products[2] instanceof Cloths).toBe(true);
  });

  it('third product is Appliance', () => {
    expect(products[3] instanceof Appliance).toBe(true);
  });
});