class User {
  id: string;
  name: string;
  tax: number;

  constructor(id: string, name: string, tax: number) {
    this.id = id;
    this.name = name;
    this.tax = tax;
  }
}

export { User };
