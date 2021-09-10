const nameValidation = (fieldName: string, fieldValue: string) => {
  if (fieldValue.trim() === '') {
    return `${fieldName} is required`;
  }
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return 'Invalid characters';
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName} needs to be at least three characters`;
  }
  return null;
};

const emailValidation = (email: string) => {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  ) {
    return null;
  }
  return 'Please enter a valid email';
};

const phoneValidation = (phone: string) => {
  if (phone.trim() === '') {
    return 'phone number is required';
  }
  if (/^[0-9\b]+$/.test(phone) || phone.length < 10 || phone.length > 15) {
    return 'Please enter a valid phone number.';
  }
  return null;
};

const dateValidation = (age: number) => {
  if (!age) {
    return 'Age is required';
  }
  if (age < 18) {
    return 'Age must be at least 18';
  }
  return null;
};

export const validation = {
  dateValidation,
  emailValidation,
  nameValidation,
  phoneValidation,
};
