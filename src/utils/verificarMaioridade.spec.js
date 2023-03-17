const { verificarMaioridade } = require('./verificarMaioridade')

const { describe, it, expect } = require('@jest/globals')

describe('Verificar maior idade', () => {
  it('Espero que 17 seja falso', () => {
    const maior = verificarMaioridade(17)
    expect(maior).toBe(false)
  })

  it('Espero que 18 seja true', () => {
    const maior = verificarMaioridade(18)
    expect(maior).toBe(true)
  })

  it('Espero que 19 seja true', () => {
    const maior = verificarMaioridade(19)
    expect(maior).toBe(true)
  })
})
