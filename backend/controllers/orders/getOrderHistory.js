export const getOrderHistory = (req, res) => {
    const userId = req.user.id;
  
    const query = `
      SELECT o.id, o.total_price, o.status, o.created_at
      FROM orders o
      WHERE o.user_id = ?
    `;
  
    db.query(query, [userId], (err, orders) => {
      if (err) return res.status(500).json({ msg: 'Error al obtener el historial de pedidos' });
      res.json(orders);
    });
  };
  