import db from '../../db.js';

// Obtener todos los ítems del carrito del usuario autenticado
export const getCart = (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }

  const query = `
    SELECT ci.id, ci.quantity, p.name, p.price, p.image_url
    FROM cart_items ci
    JOIN productos p ON ci.product_id = p.id
    WHERE ci.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error al obtener el carrito:", err);
      return res.status(500).json({ msg: 'Error al obtener el carrito' });
    }
    res.json(results);
  });
};

// Agregar un producto al carrito
export const addToCart = (req, res) => {
  const userId = req.user?.id;
  const { productId, quantity } = req.body;

  if (!userId) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }

  if (!productId || !quantity) {
    return res.status(400).json({ msg: 'Producto y cantidad son requeridos' });
  }

  // Verificar si el producto existe en la tabla productos
  const checkProductQuery = 'SELECT id FROM productos WHERE id = ?';
  
  db.query(checkProductQuery, [productId], (err, results) => {
    if (err) {
      console.error('Error al verificar el producto:', err);
      return res.status(500).json({ msg: 'Error al verificar el producto' });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    // El producto existe, continuar con la verificación del carrito

    const getCartQuery = 'SELECT id FROM carts WHERE user_id = ? AND status = "active"';

    db.query(getCartQuery, [userId], (err, results) => {
      if (err) {
        console.error('Error al verificar el carrito:', err);
        return res.status(500).json({ msg: 'Error al verificar el carrito' });
      }

      let cartId;

      if (results.length > 0) {
        // Si ya tiene un carrito activo, usamos ese cart_id
        cartId = results[0].id;
      } else {
        // Si no tiene un carrito activo, creamos uno nuevo
        const createCartQuery = 'INSERT INTO carts (user_id, status) VALUES (?, "active")';

        db.query(createCartQuery, [userId], (err, results) => {
          if (err) {
            console.error('Error al crear el carrito:', err);
            return res.status(500).json({ msg: 'Error al crear el carrito' });
          }

          cartId = results.insertId; // El nuevo cart_id generado

          // Ahora podemos agregar el producto al carrito
          addProductToCart(userId, productId, quantity, cartId, res);
        });
        return;  // Salimos de esta función para evitar seguir ejecutando el resto del código mientras se crea el carrito
      }

      // Si ya tiene un carrito activo, agregamos el producto
      addProductToCart(userId, productId, quantity, cartId, res);
    });
  });
};

// Función para agregar el producto al carrito
const addProductToCart = (userId, productId, quantity, cartId, res) => {
  const query = `
    INSERT INTO cart_items (user_id, product_id, quantity, cart_id)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + ?
  `;

  db.query(query, [userId, productId, quantity, cartId, quantity], (err, results) => {
    if (err) {
      console.error("Error al agregar al carrito:", err);
      return res.status(500).json({ msg: 'Error al agregar al carrito' });
    }

    res.status(201).json({ msg: 'Producto agregado al carrito' });
  });
};



// Eliminar un ítem del carrito
export const removeFromCart = (req, res) => {
  const userId = req.user?.id;
  const { item_id } = req.params;

  if (!userId) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }

  const query = 'DELETE FROM cart_items WHERE id = ? AND user_id = ?';

  db.query(query, [item_id, userId], (err) => {
    if (err) {
      console.error("Error al eliminar el ítem:", err);
      return res.status(500).json({ msg: 'Error al eliminar el ítem' });
    }
    res.json({ msg: 'Ítem eliminado del carrito' });
  });
};

// Vaciar el carrito
export const clearCart = (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }

  const query = 'DELETE FROM cart_items WHERE user_id = ?';

  db.query(query, [userId], (err) => {
    if (err) {
      console.error("Error al vaciar el carrito:", err);
      return res.status(500).json({ msg: 'Error al vaciar el carrito' });
    }
    res.json({ msg: 'Carrito vaciado' });
  });
};
