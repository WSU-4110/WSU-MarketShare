class Calculator {
    add(a, b) {
      return a + b;
    }
  
    subtract(a, b) {
      return a - b;
    }
  
    multiply(a, b) {
      return a * b;
    }
  
    divide(a, b) {
      if (b === 0) throw new Error('Cannot divide by zero');
      return a / b;
    }
  
    isEven(n) {
      return n % 2 === 0;
    }
  
    square(n) {
      return n * n;
    }
  }
  
  module.exports = Calculator;
  