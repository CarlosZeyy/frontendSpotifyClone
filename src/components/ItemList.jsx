import React from "react";
import SingleItem from "./SingleItem";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { artistArray } from "../../api/api";
import { songsArray } from "../../api/api";

const ItemList = ({ title, items, path, idPath }) => {
  const [itemsArray, setItemsArray] = useState([]);

  const { pathname } = useLocation();

  const isHome = pathname === "/";

  const viewItems = isHome ? items : Infinity;

  useEffect(() => {
    // Função assíncrona para carregar os dados
    const loadData = async () => {
      let data;
      if (title === "Músicas") {
        data = await songsArray(); // Buscando os dados da API
      } else {
        data = await artistArray();
      }
      setItemsArray(data);
    };

    loadData(); // Chamando a função para carregar os dados
  }, [title]);

  return (
    <div className="item-list">
      <div className="item-list__header">
        <h2>{title} Populares</h2>

        {isHome ? (
          <Link to={path} className="item-list__link">
            Mostrar tudo
          </Link>
        ) : (
          <></>
        )}
      </div>

      <div className="item-list__container">
        {itemsArray
          .filter((CurrentValue, index) => index < viewItems)
          .map((CurrentObj, index) => (
            <SingleItem
              idPath={idPath}
              artistObj={{ ...CurrentObj }}
              key={`${title}-${index}`}
            />
          ))}
      </div>
    </div>
  );
};

export default ItemList;
