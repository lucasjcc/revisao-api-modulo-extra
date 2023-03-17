const { it, expect, describe } = require('@jest/globals')

describe('Testando as operações básicas', () => {
  it('2 + 2 tem que ser igual a 4', () => {
    expect(2 + 2).toBe(4)
  })

  it('3 * 2 tem que ser igual a 6', () => {
    expect(3.5 * 2).toBeCloseTo(7.000001)
  })
})
