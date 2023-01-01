export async function setLocalStorage(key: string, value: any) {
  return localStorage.setItem(key, value);
}

export async function getLocalStorage(key: string) {
  return localStorage.getItem(key);
}

export async function removeLocalStorage(key: string) {
  return localStorage.removeItem(key);
}
