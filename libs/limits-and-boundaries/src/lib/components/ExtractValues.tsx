const ExtractValues = (value: number | [number, number]): [number, number] => {
  if (typeof value === 'number') {
    return [value, value];
  } else {
    return value;
  }
};

export { ExtractValues };
