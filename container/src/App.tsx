import { lazy, Suspense, useEffect, useState } from "react";
import { Center, SimpleGrid } from "@chakra-ui/react";
import useFetchProducts from "./hooks/useFetchProducts";
import { Skeleton } from "./constants/Skeleton";
import SkeletonLoading from "./components/Skeleton";
import { ProductCardType } from "app2/ProductCard";

const Navbar = lazy(() => import("app1/Navbar"));
const ProductCard = lazy(() => import("app2/ProductCard"));

const App = () => {
  const { isLoading, data } = useFetchProducts();
  const [copiedData, setCopiedData] = useState<ProductCardType[]>([]);

  useEffect(() => {
    setCopiedData(data);
  }, [data]);

  const setFavorite = (id: number, isFavorite: boolean) => {
    const newArray = copiedData.map((item: any) =>
      item.id === id ? { ...item, isFavorite: !isFavorite } : item
    );
    setCopiedData(newArray);
  };

  const increaseProduct = (id: number, quantity: number) => {
    const newArray = copiedData.map((item) =>
      item.id === id ? { ...item, quantity: quantity + 1 } : item
    );
    setCopiedData(newArray);
  };
  const decreaseProduct = (id: number, quantity: number) => {
    const newArray = copiedData.map((item) =>
      item.id === id
        ? item.quantity !== undefined && item.quantity > 1
          ? { ...item, quantity: quantity - 1 }
          : { ...item, quantity: 0 }
        : item
    );
    setCopiedData(newArray);
  };

  return (
    <>
      <Navbar
        data={copiedData}
        decreaseProduct={decreaseProduct}
        increaseProduct={increaseProduct}
      />
      <Center backgroundColor="#ffffff" margin="0" p="4em" marginTop="50px">
        <SimpleGrid columns={[1, 2, 5]} spacing={3} w="80%" alignItems="center">
          {!isLoading && copiedData.length !== 0
            ? copiedData.map((product, key) => (
                <Suspense key={key} fallback={<SkeletonLoading />}>
                  <ProductCard
                    {...product}
                    setFavorite={setFavorite}
                    decreaseProduct={decreaseProduct}
                    increaseProduct={increaseProduct}
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
