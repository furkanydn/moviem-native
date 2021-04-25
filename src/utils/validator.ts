import validator from 'validator';

// Durum ve Kalıplar
type ErrorMessage = string;
type ValidatorFunc = (str: string) => boolean;
type CustomValidator = [ValidatorFunc, ErrorMessage];

interface ValidatorResponse {
  isValid: boolean;
  errorMessage: string;
}

// Yardımcı Bileşen
const validateQuery = (
  validators: CustomValidator[],
  value: string,
): ValidatorResponse => {
  let index = 0;
  for (index; index < validators.length; index++) {
    const validate = validators[index];
    const [validateFunc, errorMessage] = validate;
    if (validateFunc(value)) {
      return {isValid: false, errorMessage};
    }
  }

  return {isValid: true, errorMessage: ''};
};

// Doğrulayıcılar

//-Kullanıcı Adı -//
const usernameValidator: CustomValidator[] = [
  [validator.isEmpty, 'Please enter your username'],
];
export const validateUserName = (username: string) =>
  validateQuery(usernameValidator, username);

//- Şifre -//
const passwordValidate: CustomValidator[] = [
  [validator.isEmpty, 'Please enter your password'],
  [value => value.length < 4, 'Password is too short'],
];
export const validatePassword = (password: string) =>
  validateQuery(passwordValidate, password);
