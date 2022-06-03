import {
  Text,
  Flex,
  Image,
  Box,
  Fade,
  Button,
  Center,
  ScaleFade,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Heart } from "../Icons";
import ProductCount from "./ProductCount";

export interface ProductsType {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface ProductCardProps extends ProductsType {
  isFavorite: boolean;
  addFavorite: (id: number, isFavorite: boolean) => ProductsType[];
  increaseProduct: (id: number, quantity: number) => void;
  decreaseProduct: (id: number, quantity: number) => void;
  quantity: number;
}

const ProductCard = ({
  title,
  price,
  image,
  id,
  isFavorite = false,
  addFavorite,
  increaseProduct,
  decreaseProduct,
  quantity = 0,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
      maxW="sm"
      borderRadius="1rem"
      overflow="hidden"
      w="200px"
      p="2rem"
      height="350px"
      maxHeight="500px"
      position="relative"
      border="1px solid #ebebeb"
      backgroundColor="#fff"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        top={3}
        right={3}
        position="absolute"
        sx={{
          "svg:hover": {
            fill: "red",
            path: { strokeWidth: "0px" },
            cursor: "pointer",
          },
          svg: {
            fill: isFavorite && "red",
            path: { strokeWidth: isFavorite && "0px" },
          },
        }}
        onClick={() => addFavorite(id, isFavorite)}
        zIndex={2000}
      >
        <Heart />
      </Box>
      <Flex
        color="#000"
        direction="column"
        justify="space-around"
        h="100%"
        align="center"
      >
        <Image src={image} h="150px" objectFit="fill" w="100%" />
        <Box>
          <Text fontSize="small" fontWeight="light">
            {title}
          </Text>
          <Text
            marginTop="10px"
            textAlign="center"
            fontSize="small"
            fontWeight="bold"
          >
            ${price}
          </Text>
        </Box>
      </Flex>
      <Fade in={isHovered}>
        <Box
          color="white"
          backdropFilter="auto"
          backdropBlur="8px"
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          w="100%"
        >
          <Center height="100%">
            <Flex direction="column" height="40%" justify="space-around">
              {!isOpen && (
                <Button
                  colorScheme="blue"
                  size="md"
                  fontWeight="light"
                  fontSize="sm"
                  onClick={() => {
                    onToggle();
                    increaseProduct(id, quantity);
                  }}
                  transition="all 3s ease-in-out"
                >
                  Add to Cart
                </Button>
              )}
              <ScaleFade initialScale={0.7} in={isOpen}>
                <ProductCount
                  quantity={quantity}
                  id={id}
                  onToggle={onToggle}
                  decreaseProduct={() => decreaseProduct(id, quantity)}
                  increaseProduct={() => increaseProduct(id, quantity)}
                />
              </ScaleFade>
            </Flex>
          </Center>
        </Box>
      </Fade>
    </Box>
  );
};

export default ProductCard;
