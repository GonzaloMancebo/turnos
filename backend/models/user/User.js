import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified',
  },
  verification_token: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'verification_token',
  },
  role: {
    type: DataTypes.STRING(20),
    defaultValue: 'user',
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  puntos: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'usuarios', 
  timestamps: false,     
});

export default User;
