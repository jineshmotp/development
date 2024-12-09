export const activateItemByKey = (array: any, key: any) => {
  return array.map((item: any) => ({
    ...item,
    active: item.key === key,
  }));
};

export const activateItemByKeyForMultiple = (array: any, key: any) => {
  return array.map((item: any) => ({
    ...item,
    active: item.key === key ? !item.active : item.active,
  }));
};

export const activateItemById = (array: any, id: any) => {
  return array.map((item: any) => ({
    ...item,
    active: item.id === id,
  }));
};

export function isValidURL(url: string) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}

export const activateItem = (
  item: any,
  propertyKey: any,
  array: any,
  setArray: any
) => {
  const shallowCopy = [...array];
  const updatedArr = activateItemByKey(shallowCopy, item.key);
  setArray(updatedArr);
  return updatedArr;
};


export const activateMultipleItems = (
  item: any,
  propertyKey: any,
  array: any,
  setArray: any
) => {
  const shallowCopy = [...array];
  const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);
  setArray(updatedArr);
};
