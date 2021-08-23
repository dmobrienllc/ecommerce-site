export const getAllProducts = () => {
    return fetch('/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  export const getProductById = (id) => {
    return fetch(`/api/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  export const getProductByCode = (code) => {
    return fetch(`/api/products/code/${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };

  export const createProduct = (productData) => {
    return fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
  };

  export const updateProduct = (productData) => {
    return fetch(`/api/products/${productData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
  };

  export const getProductsByCategory = (cat) => {
    return fetch(`/api/products/category/${cat}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };