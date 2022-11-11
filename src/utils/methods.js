export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const hash = (str) => {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const methods = {
  sleep,
  hash,
};

export default methods;
