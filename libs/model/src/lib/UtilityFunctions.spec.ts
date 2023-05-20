import { filterData } from './UtilityFunctions';

describe('filterData', () => {
  const sampleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('returns undefined if data is undefined', () => {
    const result = filterData(undefined, 3);
    expect(result).toBeUndefined();
  });

  it('throws an error when numberOfDataToReturn is less than 1', () => {
    expect(() => filterData(sampleData, 0)).toThrowError('numberOfDataToReturn needs to be at least 1');
    expect(() => filterData(sampleData, -5)).toThrowError('numberOfDataToReturn needs to be at least 1');
  });

  it('returns filtered data with 1 element', () => {
    const result = filterData(sampleData, 1);
    expect(result).toEqual([1]);
  });

  it('returns filtered data with 2 of elements', () => {
    const result = filterData(sampleData, 2);
    expect(result).toEqual([1, 6]);
  });

  it('returns filtered data with 3 of elements', () => {
    const result = filterData(sampleData, 3);
    expect(result).toEqual([1, 5, 9]);
  });

  it('returns filtered data with 5 of elements', () => {
    const result = filterData(sampleData, 5);
    expect(result).toEqual([1, 3, 5, 7, 9]);
  });

  it('returns the original data if number of data to return is greater than or equal to the length of data', () => {
    const result = filterData(sampleData, 15);
    expect(result).toEqual(sampleData);
  });
});
