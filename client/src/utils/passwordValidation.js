// Password validation utility functions

export const validatePassword = (password) => {
  const validations = {
    minLength: password.length >= 5,
    maxLength: password.length <= 10,
    hasOneSpecialChar: (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length === 1,
    noSpaces: !password.includes(' '),
    canContainNumbers: true // Numbers are allowed, so this is always true
  };

  return {
    ...validations,
    isValid: Object.values(validations).every(Boolean)
  };
};

export const getPasswordValidationMessage = (validations) => {
  if (validations.isValid) {
    return '';
  }
  
  const issues = [];
  if (!validations.minLength) issues.push('Password must be at least 5 characters');
  if (!validations.maxLength) issues.push('Password must be no more than 10 characters');
  if (!validations.hasOneSpecialChar) issues.push('Password must contain exactly 1 special character');
  if (!validations.noSpaces) issues.push('Password cannot contain spaces');
  
  return issues.join('. ');
};
