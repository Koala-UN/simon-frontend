export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePositiveNumber = (number: string): boolean => {
  const re = /^[1-9]\d*$/;
  return re.test(number);
};

export const validatePositiveCapacity = (capacity: string): boolean => {
  const re = /^[1-9]\d*$/;
  return re.test(capacity);
};
