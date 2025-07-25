export const devLog = (...args) => {
  if (import.meta.env.MODE === "development") {
    console.log(...args);
  }
};
