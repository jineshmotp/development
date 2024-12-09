export const activateItemByKey = (array: any, key: any) => {
  return array.map((item: any) => ({
    ...item,
    isActive: item.key === key,
  }));
};

export const activateItemByKeyForMultiple = (arr, key) => {
  return arr.map(item => {
    if (item.key === key) {
      return { ...item, isActive: !item.isActive };
    }
    return item;
  });
};
