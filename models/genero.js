const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Genero = sequelize.define('Genero', {
  id_genero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre_genero: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'genero',
  timestamps: false
});

module.exports = Genero;
