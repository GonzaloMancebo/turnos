export const updateOrderStatus = (req, res) => {
    const { orderId, status } = req.body;
  
    if (!['pending', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ msg: 'Estado inválido' });
    }
  
    const query = `
      UPDATE orders SET status = ? WHERE id = ?
    `;
  
    db.query(query, [status, orderId], (err) => {
      if (err) return res.status(500).json({ msg: 'Error al actualizar el estado de la orden' });
      res.json({ msg: `Estado de la orden actualizado a ${status}` });
    });
  };
  