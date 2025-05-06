import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    dialect: 'mysql',
    logging: false, // Desactiva el logging SQL si no lo necesitas
  }
);

try {
  await sequelize.authenticate();
  console.log('✅ Conectado a MySQL');
} catch (error) {
  console.error('Error al conectar a la base de datos:', error);
}

export default sequelize;
