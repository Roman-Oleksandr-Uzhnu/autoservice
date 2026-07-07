"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  service: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  console.log("CartProvider rendered");
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(item: CartItem) {
    console.log("ADD ITEM:", item);
    setItems((prev) => {
      console.log("PREV ITEMS:", prev);
      const existing = prev.find(
        (i) => i.service === item.service
      );

      if (existing) {
        return prev.map((i) =>
          i.service === item.service
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
              }
            : i
        );
      }

      return [...prev, item];
    });
  }

  function clearCart() {
    setItems([]);
  }

  console.log("CURRENT ITEMS:", items);
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
