export function filterData<T>(data: T[] | undefined, numberOfDataToReturn: number) {
  if (data == undefined) return undefined;

  if (numberOfDataToReturn < 1) throw new Error('numberOfDataToReturn needs to be at least 1');

  const indexModulo = Math.max(Math.ceil(data.length / numberOfDataToReturn), 1);

  return data.reduce((arr, current, currentIndex) => {
    if (currentIndex % indexModulo === 0) arr.push(current);
    return arr;
  }, [] as T[]);
}
