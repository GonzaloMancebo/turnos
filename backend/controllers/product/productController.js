import db from '../../db.js';

// Obtener todos los productos
export const getProducts = (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Error al obtener productos' });
    }
    res.json(results);
  });
};

// Obtener un producto por SKU
export const getProductBySku = (req, res) => {
  const { sku } = req.params;
  db.query('SELECT * FROM productos WHERE sku = ?', [sku], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Error al obtener el producto' });
    }
    if (results.length === 0) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    res.json(results[0]);
  });
};

// Agregar un nuevo producto
export const addProduct = (req, res) => {
  const { sku, name, description, price, stock, image_url, brand, model, category_id, characteristics, activo, outstanding } = req.body;
  
  const newProduct = { sku, name, description, price, stock, image_url, brand, model, category_id, characteristics, activo, outstanding };
  
  db.query('INSERT INTO productos SET ?', newProduct, (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Error al agregar el producto' });
    }
    res.status(201).json({ msg: 'Producto agregado exitosamente' });
  });
};

// Actualizar un producto
export const updateProduct = (req, res) => {
  const { sku } = req.params;
  const { name, description, price, stock, image_url, brand, model, category_id, characteristics, activo, outstanding } = req.body;
  
  const updatedProduct = { name, description, price, stock, image_url, brand, model, category_id, characteristics, activo, outstanding };
  
  db.query('UPDATE productos SET ? WHERE sku = ?', [updatedProduct, sku], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Error al actualizar el producto' });
    }
    res.json({ msg: 'Producto actualizado exitosamente' });
  });
};

// Eliminar un producto
export const deleteProduct = (req, res) => {
  const { sku } = req.params;
  db.query('DELETE FROM productos WHERE sku = ?', [sku], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Error al eliminar el producto' });
    }
    res.json({ msg: 'Producto eliminado exitosamente' });
  });
};
