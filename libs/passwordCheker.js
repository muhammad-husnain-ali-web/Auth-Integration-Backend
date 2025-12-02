export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

export function isStrongPassword(password) {

  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongRegex.test(password);
}