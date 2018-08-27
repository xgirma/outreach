export const errorObjectify = (data) => {
  const { name, message } = data;
  const error = new Error(message);
  error.name = name;
  return error;
};