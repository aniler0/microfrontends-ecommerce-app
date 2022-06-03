import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Center, Flex, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";

interface ProductCountProps {
  onToggle: () => void;
}

const ProductCount = ({ onToggle }: ProductCountProps) => {
  const [count, setCount] = useState(1);
  const increaseProduct = () => {
    setCount(count + 1);
  };
  const decreaseProduct = () => {
    if (count > 1) {
      setCount(count - 1);
    } else if (count === 1) {
      setCount(1);
      onToggle();
    }
  };
  return (
    <Center>
      <Flex borderRadius="sm">
        <IconButton
          borderRightRadius="0"
          aria-label="plus"
          colorScheme="blue"
          size="sm"
          onClick={decreaseProduct}
          icon={
            count === 1 ? <DeleteIcon w={3} h={3} /> : <MinusIcon w={3} h={3} />
          }
        />
        <Center w="32px" h="32px" backgroundColor="white">
          <Text color="black" fontSize="sm" fontWeight="bold">
            {count}
          </Text>
        </Center>
        <IconButton
          borderLeftRadius="0"
          onClick={increaseProduct}
          aria-label="plus"
          colorScheme="blue"
          size="sm"
          icon={<AddIcon w={3} h={3} />}
        />
      </Flex>
    </Center>
  );
};

export default ProductCount;
