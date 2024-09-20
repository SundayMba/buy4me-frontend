import React, { useContext } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const Popular = () => {
  const { all_product } = useContext(ShopContext);
  const data_product = all_product.filter(
    (product) => product.section.toLowerCase() === "popular"
  );
  return (
    <div className="popular container">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, index) => {
          return (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              old_price={item.old_price}
              new_price={item.new_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
