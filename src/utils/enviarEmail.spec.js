const { enviarEmail } = require('./enviarEmail')
const { describe, it, expect } = require('@jest/globals')

describe('Enviar email', () => {
  it('Espero que a função me retorne true', () => {
    const texto = 'Olá'
    const destinario = 'Lucas'
    const retorno = enviarEmail(texto, destinario)
    expect(retorno).toBe(true)
  })

  it('Espero que o console seja chamado 1 vez', () => {
    const texto = 'Olá'
    const destinario = 'Lucas'
    const consoleMockado = jest.spyOn(console, 'log')
    enviarEmail(texto, destinario)
    expect(consoleMockado).toHaveBeenCalledTimes(2)
  })
})
