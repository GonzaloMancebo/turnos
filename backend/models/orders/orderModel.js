import db from '../../db.js';

// Crear una nueva orden
export const createOrder = (userId, totalPrice) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, "pending")';
    db.query(query, [userId, totalPrice], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId); // Devuelve el ID de la orden recién creada
    });
  });
};

// Insertar productos en la orden
export const addProductsToOrder = (orderId, cartItems) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
    cartItems.forEach(item => {
      db.query(query, [orderId, item.product_id, item.quantity, item.price], (err) => {
        if (err) return reject(err);
      });
    });
    resolve();
  });
};

// Obtener historial de órdenes
export const getOrdersByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM orders WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Actualizar el estado de la orden
export const updateOrderStatus = (orderId, status) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    db.query(query, [status, orderId], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
