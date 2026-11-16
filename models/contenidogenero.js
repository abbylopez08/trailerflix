const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const ContenidoGenero = sequelize.define('ContenidoGenero', {
  id_contenido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  genero_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  tableName: 'contenido_generos',
  timestamps: false
});

module.exports = ContenidoGenero;
