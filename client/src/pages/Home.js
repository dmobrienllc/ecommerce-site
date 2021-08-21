import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../utils/product-api';

const Home = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getProductList = async () => {
      try {
        const res = await getAllProducts();
        if (!res.ok) {
          throw new Error('No Product List returned');
        }
        const productList = await res.json();
        setProductList(productList);
      } catch (err) {
        console.error(err);
      }
    };
    getProductList();
  }, []);

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to David OBrien's Outdoor Adventure Store!</h1>
      </div>
      <div className="card-body m-5">
        <h2>Here is a list of products you can view:</h2>
        <ul className="square">
          {productList.map((product) => {
            return (
              <li key={product._id}>
                <Link to={{ pathname: `/product/${product._id}` }}>
                  Product: {product.name}, Category: {product.category}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="card-footer text-center m-3">
        <h2>Ready to create a new product?</h2>
        <Link to="/createproduct">
          <button className="btn btn-lg btn-danger">Create Product!</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
