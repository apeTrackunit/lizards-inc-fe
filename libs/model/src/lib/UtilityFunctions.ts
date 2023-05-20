/**
 Filters an array of data and returns a subset of the data based on the specified number of items to return.
 @template T - The type of data elements in the array.
 @param data - The array of data to filter.
 @param numberOfDataToReturn - The number of data items to return.
 @returns An array containing a subset of the data elements based on the specified number of items to return. Or undefined if the initial data array is undefined
 @throws Error if numberOfDataToReturn is less than 1.
 */
export function filterData<T>(data: T[] | undefined, numberOfDataToReturn: number) {
  if (data == undefined) return undefined;

  if (numberOfDataToReturn < 1) throw new Error('numberOfDataToReturn needs to be at least 1');

  const indexModulo = Math.max(Math.ceil(data.length / numberOfDataToReturn), 1);

  return data.reduce((arr, current, currentIndex) => {
    if (currentIndex % indexModulo === 0) arr.push(current);
    return arr;
  }, [] as T[]);
}
