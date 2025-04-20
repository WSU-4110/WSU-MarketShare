const Calculator = require('./Calculator');
const calc = new Calculator();

test('adds two numbers', () => {
  expect(calc.add(2, 3)).toBe(5);
});

test('subtracts two numbers', () => {
  expect(calc.subtract(5, 2)).toBe(3);
});

test('multiplies two numbers', () => {
  expect(calc.multiply(3, 4)).toBe(12);
});

test('divides two numbers', () => {
  expect(calc.divide(10, 2)).toBe(5);
});

test('throws error when dividing by zero', () => {
  expect(() => calc.divide(5, 0)).toThrow('Cannot divide by zero');
});

test('checks if a number is even', () => {
  expect(calc.isEven(6)).toBe(true);
  expect(calc.isEven(7)).toBe(false);
});

test('squares a number', () => {
  expect(calc.square(4)).toBe(16);
});
