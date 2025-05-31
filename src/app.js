const express = require('express');
const app = express();
const clienteRoutes = require('./routes/clienteRoutes');
const sequelize = require('./config/connection');

app.use(express.json());

app.use(clienteRoutes);

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => console.error('Erro na conexão com o banco:', err));

module.exports = app;