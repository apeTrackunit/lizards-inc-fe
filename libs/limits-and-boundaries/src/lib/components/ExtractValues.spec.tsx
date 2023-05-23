import { ExtractValues } from './ExtractValues';

describe('ExtractValues', () => {
  it('returns an array with two identical numbers when input is a single number', () => {
    const input = 5;
    const expectedOutput = [input, input];
    const result = ExtractValues(input);
    expect(result).toEqual(expectedOutput);
  });

  it('returns the input array as is when input is an array of two numbers', () => {
    const expectedOutput = [2, 8];
    const result = ExtractValues([2, 8]);
    expect(result).toEqual(expectedOutput);
  });
});
