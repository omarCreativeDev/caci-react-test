interface KeyValueObj {
  [key: string]: any;
}

export const lowToHighSort = (property: string) => {
  return function innerSort(a: KeyValueObj, b: KeyValueObj) {
    if (a[property] < b[property]) {
      return -1;
    }
    if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  };
};
