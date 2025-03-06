

export const getStorage = () => (localStorage.getItem('phoneBook') ?
    JSON.parse(localStorage.getItem('phoneBook')) : []);

export const setStorage = (key, obj) => {
  const receivedArray = getStorage();
  receivedArray.push(obj);
  localStorage.setItem(key, JSON.stringify(receivedArray));
};

export const removeStorage = (tel) => {
  const modifyArray = getStorage().filter(obj =>
    obj.phone !== tel);
  localStorage.setItem('phoneBook', JSON.stringify(modifyArray));
};

