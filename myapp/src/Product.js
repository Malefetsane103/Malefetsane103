import React, { useState, useEffect } from 'react';
import './App.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [editIndex, setEditIndex] = useState(-1);

  // Load products from localStorage on initial load
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProducts = [...products];

    if (editIndex === -1) {
      updatedProducts.push(product);
    } else {
      updatedProducts[editIndex] = product;
    }

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Reset the form
    setProduct({
      name: "",
      description: "",
      category: "",
      price: "",
      quantity: "",
    });
    setEditIndex(-1);
  };

  // Handle edit action
  const handleEdit = (index) => {
    setProduct(products[index]);
    setEditIndex(index);
  };

  // Handle delete action
  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Handle logout
  const handleLogout = () => {
    // Clear authentication token (or user session)
    localStorage.removeItem("authToken");  
    window.location.href = "/login";  
  };

  return (
    <div className="container">
      {/* Add the logout button */}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>

      <form onSubmit={handleSubmit}>
        <h2>{editIndex === -1 ? "Add Product" : "Update Product"}</h2>
        <input type="hidden" id="productIndex" value={editIndex} />
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          required
        />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          required
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />
        <label htmlFor="quantity">Initial Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          required
        />
        <button type="submit">
          {editIndex === -1 ? "Add Product" : "Update Product"}
        </button>
      </form>

      <table id="productTable">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            // Ensures that the product is not null or undefined
            product && (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
