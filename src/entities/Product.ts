class Product {
  id: string;
  name: string;
  price: number;
  priceWithTax: number | null;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.priceWithTax = null;
  }
}

export { Product };
