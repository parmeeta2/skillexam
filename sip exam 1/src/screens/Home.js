// Home.js

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import ProductCard from '../components/Cards';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetching data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/foodData/get', {
          method: 'POST',
        });
        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Fetch data only once when the component mounts

  return (
    <div>
      <Navbar />
      <Carousel />
      <div className="container mt-4">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <ProductCard
                imageUrl={product.img}
                title={product.name}
                price={product.options[0]?.half || product.options[0]?.regular}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
