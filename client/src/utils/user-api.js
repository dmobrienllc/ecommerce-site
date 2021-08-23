export const getUserByEmail = (email) => {
    return fetch(`/api/users/email/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };

  export const getUserById = (id) => {
    return fetch(`/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  export const createUser = (userData) => {
      console.log("In userApi.createUser ",userData)
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };

  export const updateUser = (userData) => {
    return fetch(`/api/users/${userData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
