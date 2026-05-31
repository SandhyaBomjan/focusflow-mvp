export const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

export const hasValue = (value) => value.trim().length > 0;

export const isLoginValid = ({ email, password }) =>
  hasValue(email) && hasValue(password) && isEmailValid(email);

export const isRegisterValid = ({ name, email, password }) =>
  hasValue(name) && hasValue(email) && hasValue(password) && isEmailValid(email);

export const isTaskValid = ({ title }) => hasValue(title);