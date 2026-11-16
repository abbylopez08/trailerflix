const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Contenido = sequelize.define('Contenido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  sinopsis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  temporada: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  trailer: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'contenido',
  timestamps: false
});

module.exports = Contenido;