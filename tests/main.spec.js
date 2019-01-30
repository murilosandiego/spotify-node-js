/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

/*
Desafio FizzBuzz
Escreva uma lib que receba um número e:
Se o número for divisível por 3, no lugar do número escreva 'Fizz' - X
Se o número for divisível por 5, no lugar do número escreva 'Buzz' - X
Se o número for divisível por 3 e 5, no lugar do número escreva 'FizzBuzz' - X
Se não for múltiplo de nada, retorna o número
 */
import { expect } from 'chai';
import FizzBuzz from '../src/main';

describe('FizzBuzz', () => {
  it('should FizzBuzz lib exists', () => {
    expect(FizzBuzz).to.exist;
  });
  it('should return `Fizz` when multiple of 3', () => {
    expect(FizzBuzz(3)).to.equal('Fizz');
    expect(FizzBuzz(9)).to.equal('Fizz');
  });
  it('should return `Buzz` when multiple of 5', () => {
    expect(FizzBuzz(5)).to.equal('Buzz');
    expect(FizzBuzz(10)).to.equal('Buzz');
  });
  it('sould return `FizzBuzz` when multiple of 5 and 3 ', () => {
    expect(FizzBuzz(15)).to.equal('FizzBuzz');
  });
  it('should return number when non-multiple', () => {
    expect(FizzBuzz(7)).to.equal(7);
    expect(FizzBuzz(0)).to.equal(0);
  });
});
