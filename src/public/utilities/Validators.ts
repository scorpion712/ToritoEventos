export const validEmail = (email: string) => {
    // Email validation using a regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

export const isPasswordValid = (password: string) => {
    // Password validation using regular expressions
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

export const isOver18 = (birthdate: Date): boolean => {
  if (!birthdate) return false;
  // Calculate the difference in milliseconds
  const differenceInMilliseconds = new Date().getTime() - birthdate.getTime();

  // Calculate the difference in years
  return differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25) >= 18;
}