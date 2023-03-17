const { describe, it, expect } = require('@jest/globals')

describe('Testes básicos com objetos', () => {
  it('Devem têm a mesma propriedade', () => {
    const aluno = { nome: 'Lucas', idade: 28 }
    expect(aluno).toHaveProperty('idade', 28)
  })
})
