const Cliente = require('../models/cliente');
const { Op } = require('sequelize');

module.exports = {
  async create(req, res) {
    const { nome, cpf } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const cpfExiste = await Cliente.findOne({ where: { cpf } });
    if (cpfExiste) {
      return res.status(400).json({ error: 'CPF já cadastrado' });
    }

    try {
      const cliente = await Cliente.create(req.body);
      return res.status(201).json(cliente);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getById(req, res) {
    const { codigo } = req.params;

    try {
      const cliente = await Cliente.findByPk(codigo);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      return res.status(200).json(cliente);
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getAll(req, res) {
    const { nome, cidade, uf } = req.query;
    let filtro = {};

    if (nome) filtro.nome = { [Op.iLike]: `%${nome}%` };
    if (cidade) filtro.cidade = { [Op.iLike]: `%${cidade}%` };
    if (uf) filtro.uf = uf.toUpperCase();

    try {
      const clientes = await Cliente.findAll({ where: filtro });
      return res.status(200).json(clientes);
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async update(req, res) {
    const { codigo } = req.params;
    const { cpf } = req.body;

    try {
      const cliente = await Cliente.findByPk(codigo);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      if (cpf) {
        const cpfExiste = await Cliente.findOne({
          where: { cpf, codigo: { [Op.ne]: codigo } }
        });
        if (cpfExiste) {
          return res.status(400).json({ error: 'CPF já cadastrado para outro cliente' });
        }
      }

      await cliente.update(req.body);
      return res.status(200).json(cliente);
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async delete(req, res) {
    const { codigo } = req.params;

    try {
      const cliente = await Cliente.findByPk(codigo);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      await cliente.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};