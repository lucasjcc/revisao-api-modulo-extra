require('dotenv').config()
const express = require('express')
const { listarAlunos, listarAluno } = require('./controladores/aluno')
const rotas = express()

rotas.get('/alunos', listarAlunos)
rotas.get('/alunos/:id', listarAluno)

module.exports = { rotas }
