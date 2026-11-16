const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const ContenidoActor = sequelize.define('ContenidoActor', {
  id_contenido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  actor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  tableName: 'contenido_actores',
  timestamps: false
});

module.exports = ContenidoActor;
