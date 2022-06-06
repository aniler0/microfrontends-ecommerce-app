import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import { Center, Flex, IconButton, Text } from "@chakra-ui/react";

interface ProductAddProps {
  increaseProduct: (id: number, quantity: number) => void;
  decreaseProduct: (id: number, quantity: number) => void;
  quantity: number;
  id: number;
  onToggle?: () => void;
}

const ProductAdd = ({
  decreaseProduct,
  increaseProduct,
  quantity,
  id,
}: ProductAddProps) => {
  return (
    <Center>
      <Flex borderRadius="sm">
        <IconButton
          borderRightRadius="0"
          aria-label="plus"
          colorScheme="blue"
          size="sm"
          onClick={() => {
            decreaseProduct(id, quantity);
          }}
          icon={
            quantity === 1 ? (
              <DeleteIcon w={3} h={3} />
            ) : (
              <MinusIcon w={3} h={3} />
            )
          }
        />
        <Center w="32px" h="32px" backgroundColor="white">
          <Text color="black" fontSize="sm" fontWeight="bold">
            {quantity}
          </Text>
        </Center>
        <IconButton
          borderLeftRadius="0"
          onClick={() =>
            increaseProduct !== undefined && increaseProduct(id, quantity)
          }
          aria-label="plus"
          colorScheme="blue"
          size="sm"
          icon={<AddIcon w={3} h={3} />}
        />
      </Flex>
    </Center>
  );
};

export default ProductAdd;
