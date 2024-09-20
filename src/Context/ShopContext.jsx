import React, { createContext, useEffect, useState } from "react";
// import all_product from "../Assets/all_product";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/v1/products`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const data = await res.json();
        if (data.status_code === 200) {
          console.log(`data: ${data.data}`);
          setAllProducts(data.data);
          // console.log(`products: ${all_product}`);
        }
      } catch (error) {
        console.log(`Errors are: ${error}`);
      }
    };

    fetchProducts();
  }, []);

  // function getDefaultCart() {
  //   let cart = {};
  //   all_product.forEach((product) => {
  //     cart[product.id] = 0;
  //   });
  //   console.log(`cart: ${JSON.stringify(cart)}`);
  //   return cart;
  // }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let product = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += product.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getCartQuantity = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  const addToCart = (itemId) => {
    // const p =all_product.find((product) => product.id === Number(itemId));
    // console.log(`prod1: ${p.name}`);
    setCartItems((prev) => {
      if (itemId in prev) {
        console.log(prev);
        return {
          ...prev,
          [itemId]: prev[itemId] + 1,
        };
      } else {
        // console.log("not exist");
        return {
          ...prev,
          [itemId]: 1,
        };
      }
    });
    console.log(`cartId: ${itemId}`);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
  };
  const contextValue = {
    getCartQuantity,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
