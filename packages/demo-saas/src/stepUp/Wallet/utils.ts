export const style = {
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function addQueryParam(key: string, value: string) {
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set(key, value);

  // Push the new URL to the history without navigation
  window.history.pushState({ path: newUrl.href }, '', newUrl.href);
}

export function removeQueryParam(key: string) {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.delete(key);

  // Push the updated URL to the history without navigation
  window.history.pushState({ path: currentUrl.href }, '', currentUrl.href);
}

export const getQueryParam = (key: string) => new URLSearchParams(window.location.search).get(key);

export const addLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);
export const getLocalStorage = (key: string) => localStorage.getItem(key);
export const removeLocalStorage = (...keys: string[]) => keys.forEach((key) => localStorage.removeItem(key));

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
