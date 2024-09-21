import React, { useContext } from "react";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";
import "./NewCollections.css";

const NewCollections = () => {
  const { all_product } = useContext(ShopContext);
  const new_collection = all_product.filter(
    (product) => product.section.toLowerCase() === "collection"
  );
  return (
    <div className="new-collections container">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collection" id="latest-col">
        {new_collection.map((item, index) => {
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

export default NewCollections;
