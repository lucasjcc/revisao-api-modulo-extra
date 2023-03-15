const { pool } = require('../config/banco')

const idUsuarioLogado = 1

const listarAlunos = async (req, res) => {
  const { media } = req.query
  if (isNaN(Number(media))) {
    return res.status(400).json({ mensagem: 'Filtro inválido. Espero um número' })
  }
  try {
    let queryConsulta = `
      SELECT
        id,
        nome,
        frequencia,
        media,
        CASE
          WHEN media >= 6 AND frequencia >= 75 THEN 'aprovado'
          ELSE 'reprovado'
        END as situacao
      FROM
        aluno
      WHERE
        professor_responsavel = $1
      `
    let valores = [idUsuarioLogado]

    if (media) {
      queryConsulta = `
        SELECT
          id,
          nome,
          frequencia,
          media,
          CASE
            WHEN media >= 6 AND frequencia >= 75 THEN 'aprovado'
            ELSE 'reprovado'
          END as situacao
        FROM
          aluno
        WHERE
          professor_responsavel = $1 AND
          media >= $2;
      `
      valores = [idUsuarioLogado, Number(media)]
    }

    const { rows: alunos } = await pool.query(queryConsulta, valores)
    return res.status(200).json(alunos)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor' })
  }
}

const listarAluno = async (req, res) => {
  const { id: idAluno } = req.params
  try {
    const texto = `
      SELECT
      id,
      nome,
      frequencia,
      media,
      CASE
        WHEN media >= 6 AND frequencia >= 75 THEN 'aprovado'
        ELSE 'reprovado'
        END as situacao
      FROM
        aluno
      WHERE
        id = $1;
    `
    const valores = [idAluno]
    const { rows: alunos, rowCount } = await pool.query(texto, valores)
    if (rowCount === 0) {
      return res.status(404).json({ mensagem: 'Aluno não encotrado' })
    }
    const aluno = alunos[0]
    return res.status(200).json(aluno)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor' })
  }
}

module.exports = {
  listarAlunos,
  listarAluno
}
