const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Categoria = sequelize.define('Categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre_categoria: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'categoria',
  timestamps: false
});

module.exports = Categoria;