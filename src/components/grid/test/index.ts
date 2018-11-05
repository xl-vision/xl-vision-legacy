// import { mocked } from 'ts-jest/utils'

function sum(a: number, b: number) {
  return a + b
}

test('demo', () => {
  expect(sum(1, 2)).toBe(3)
})