export function filterData<T>(data: T[] | undefined, numberOfDataToReturn: number) {
  if (data == undefined) return undefined;

  const indexModulo = Math.max(Math.round(data.length / numberOfDataToReturn), 1);

  return data.reduce((arr, current, currentIndex) => {
    if (currentIndex % indexModulo === 0) arr.push(current);
    return arr;
  }, [] as T[]);
}
