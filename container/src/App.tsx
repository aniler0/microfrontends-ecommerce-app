import { lazy, Suspense, useState } from "react";
import { Center, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import useFetchProducts from "./hooks/useFetchProducts";
import { Skeleton } from "./constants/Skeleton";
import SkeletonLoading from "./components/Skeleton";
import { ProductsType } from "./types/productsType";

const ProductCard = lazy(() => import("app2/ProductCard"));

const App = () => {
  const { isLoading, data, setData } = useFetchProducts();
  const [cart, setCart] = useState<ProductsType[]>([]);

  const addFavorite = (id: string, isFavorite: boolean) => {
    setData(
      data.map((item: any) =>
        item.id === id ? { ...item, isFavorite: !isFavorite } : item
      )
    );
  };

  const increaseProduct = (id: number, quantity: number) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, quantity: quantity + 1 } : item
      )
    );
  };
  const decreaseProduct = (id: number, quantity: number) => {
    setData(
      data.map((item) =>
        item.id === id
          ? item.quantity !== undefined && item.quantity > 1
            ? { ...item, quantity: quantity - 1 }
            : { ...item, quantity: 0 }
          : item
      )
    );
  };

  return (
    <>
      <Navbar data={data} />
      <Center backgroundColor="#ffffff" margin="0" p="4em" marginTop="50px">
        <SimpleGrid columns={[1, 2, 5]} spacing={3} w="80%" alignItems="center">
          {!isLoading && data.length !== 0
            ? data.map((product, key) => (
                <Suspense key={key} fallback={<SkeletonLoading />}>
                  <ProductCard
                    increaseProduct={increaseProduct}
                    decreaseProduct={decreaseProduct}
                    addFavorite={addFavorite}
                    {...product}
                  />
                </Suspense>
              ))
            : Skeleton.map((skeleton, key) => <SkeletonLoading key={key} />)}
        </SimpleGrid>
      </Center>
    </>
  );
};

export default App;
