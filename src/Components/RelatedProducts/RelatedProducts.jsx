import React, { useContext } from "react";
import "./RelatedProducts.css";
// import data_product from "../../Assets/data"
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const RelatedProducts = () => {
  const { all_product } = useContext(ShopContext);
  const data_product = all_product.slice(0, 4);
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
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

export default RelatedProducts;
