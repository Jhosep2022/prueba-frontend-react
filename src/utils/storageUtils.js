export function safeLocalStorageSetItem(key, value) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Error accessing local storage:', error);
    }
  }
  
export function safeLocalStorageGetItem(key) {
try {
    if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage.getItem(key);
    }
} catch (error) {
    console.error('Error accessing local storage:', error);
    return null;
}
}
  