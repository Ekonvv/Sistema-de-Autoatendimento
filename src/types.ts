export type Product = {
  id: number;
  title: string;
  price: number;
  img: string;
};

export type CartItem = Product & {
  quantity: number;
};
