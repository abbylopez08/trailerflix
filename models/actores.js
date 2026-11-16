const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Actor = sequelize.define('Actor', {
  id_actores: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre_actores: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'actores',
  timestamps: false
});

module.exports = Actor;
