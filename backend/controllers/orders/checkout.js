export const checkout = (req, res) => {
    const userId = req.user.id;
  
    // Obtener los productos del carrito
    const getCartQuery = `
      SELECT ci.product_id, ci.quantity, p.price
      FROM cart_items ci
      JOIN productos p ON ci.product_id = p.id
      WHERE ci.user_id = ? AND ci.cart_id = 1;  // Considera el carrito activo
    `;
  
    db.query(getCartQuery, [userId], (err, cartItems) => {
      if (err) return res.status(500).json({ msg: 'Error al obtener el carrito' });
  
      // Calcular el total
      let totalPrice = 0;
      cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
      });
  
      // Crear la orden
      const createOrderQuery = `
        INSERT INTO orders (user_id, total_price, status)
        VALUES (?, ?, 'pending')
      `;
      db.query(createOrderQuery, [userId, totalPrice], (err, result) => {
        if (err) return res.status(500).json({ msg: 'Error al crear la orden' });
  
        const orderId = result.insertId;
  
        // Insertar los productos en la orden
        const insertOrderItemsQuery = `
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES (?, ?, ?, ?)
        `;
  
        cartItems.forEach(item => {
          db.query(insertOrderItemsQuery, [orderId, item.product_id, item.quantity, item.price], (err) => {
            if (err) return res.status(500).json({ msg: 'Error al agregar los productos a la orden' });
          });
        });
  
        // Vaciar el carrito después de la compra
        const clearCartQuery = 'DELETE FROM cart_items WHERE user_id = ?';
        db.query(clearCartQuery, [userId], (err) => {
          if (err) return res.status(500).json({ msg: 'Error al vaciar el carrito' });
  
          res.json({ msg: 'Orden creada y carrito vacío. ¡Gracias por tu compra!' });
        });
      });
    });
  };
  