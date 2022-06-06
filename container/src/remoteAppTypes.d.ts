declare module "app1/Navbar" {
  export interface NavbarProps {
    data: ProductCard[];
    decreaseProduct: (id: number, quantity: number) => void;
    increaseProduct: (id: number, quantity: number) => void;
  }
  const Navbar: React.ComponentType<NavbarProps>;

  export default Navbar;
}

declare module "app2/ProductCard" {
  export interface ProductCardType {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    isFavorite: boolean;
    quantity: number;
  }

  export interface ProductCardProps extends ProductCard {
    setFavorite: (id: number, isFavorite: boolean) => void;
    increaseProduct: (id: number, quantity: number) => void;
    decreaseProduct: (id: number, quantity: number) => void;
  }
  const ProductCard: React.ComponentType<ProductCardProps>;

  export default ProductCard;
}
