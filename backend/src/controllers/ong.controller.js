const generateUniqueId = require('../utils/generateUniqueId');
const { connection } = require('../database/connection');

const create = async (req, res) => {
  const { name, email, whatsapp, city, uf } = req.body;

  const id = generateUniqueId();

  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  });

  return res.json({ id });
}

const index = async (req, res) => {
  const ongs = await connection('ongs').select('*');

  return res.json(ongs);
}

module.exports = {
  create,
  index,
}