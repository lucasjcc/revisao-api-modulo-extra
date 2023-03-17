require('dotenv').config()
const axios = require('axios')
const { describe, it, expect, beforeEach, afterAll } = require('@jest/globals')
const { pool } = require('../config/banco')
const { idUsuarioLogado } = require('../controladores/aluno')

const requisicao = (url, metodo, dados) => {
  return axios({
    url,
    method: metodo,
    data: dados
  })
}

beforeEach(async () => {
  await pool.query('DELETE FROM aluno;')
})

afterAll(async () => {
  await pool.query('DELETE FROM aluno;')
})

describe('Controlador aluno', () => {
  describe('Listar alunos', () => {
    it('Deve vir um array de alunos', async () => {
      const resposta = await requisicao('http://localhost:3000/alunos', 'get')
      expect(Array.isArray(resposta.data)).toBe(true)
    })

    it('Deve vir um array de alunos com tamanho igual a 0', async () => {
      const resposta = await requisicao('http://localhost:3000/alunos', 'get')
      expect(resposta.data.length).toBe(0)
    })

    it('Os alunos devem ter o campo id', async () => {
      await pool.query(`
        INSERT INTO aluno
          (nome, media, frequencia, professor_responsavel)
        VALUES
          ('Avram Maddox', 1, 92, $1);
        `, [idUsuarioLogado]
      )
      const resposta = await requisicao('http://localhost:3000/alunos', 'get')
      const primeiroAluno = resposta.data[0]
      expect(primeiroAluno).toHaveProperty('id')
    })
  })
})
