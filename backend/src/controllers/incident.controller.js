const { connection } = require('../database/connection');

const create = async (req, res) => {
  const { title, description, value } = req.body;

  const ong_id = req.headers.authorization;

  const [id] = await connection('incidents').insert({
    title,
    description,
    value,
    ong_id,
  });

  return res.json({ id });
};

const index = async (req, res) => {
  const { page = 1 } = req.query;

  const [count] = await connection('incidents')
    .count();

  const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // Mescla dados da tabela incidents com a tabela ongs
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf',
    ]); // Seleciona todos os dados da tabela incidents ('*') e apenas os que quero da tabela ongs

  // Envia a resposta do valor total de itens (count) no header da resposta
  res.header('X-Total-Count', count['count(*)']);

  return res.json(incidents);
};

const del = async (req, res) => {
  const { id } = req.params;
  const ong_id = req.headers.authorization;

  const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();

  if (incident.ong_id !== ong_id) {
    return res.status(401).json({ error: 'Operation not allowed' });
  }

  await connection('incidents')
    .where('id', id)
    .delete();

  return res.status(204).send();
}

module.exports = {
  create,
  index,
  del,
}