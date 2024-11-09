export type ValidationResult = {
  status: boolean
  message?: string
}
export function validateEmail(email?: string): ValidationResult {
  let validation: ValidationResult
  if (!email || email.trim() === '') {
    validation = {
      status: false,
      message: 'Email cannot be empty'
    }
    return validation
  }
  // Regular expression for email validation
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // Test if email matches the regex
  if (!regex.test(email)) {
    validation = {
      status: false,
      message: 'Invalid email format'
    }
    return validation
  }
  validation = {
    status: true
  }
  return validation
}
export function validatePassword(password: string) {
  // Password should be at least 8 characters long
  const minLength = 8
  const maxLength = 50

  // Regular expression checks:
  const hasUpperCase = /[A-Z]/.test(password) // At least one uppercase letter
  const hasLowerCase = /[a-z]/.test(password) // At least one lowercase letter
  const hasDigits = /\d/.test(password) // At least one number
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password) // At least one special character

  // Validate password
  if (password.length < minLength) {
    return 'Password must be at least 8 characters long.'
  }
  if (password.length > maxLength) {
    return 'Password must not exceed 50 characters.'
  }
  if (!hasUpperCase) {
    return 'Password must contain at least one uppercase letter.'
  }
  if (!hasLowerCase) {
    return 'Password must contain at least one lowercase letter.'
  }
  if (!hasDigits) {
    return 'Password must contain at least one number.'
  }
  if (!hasSpecialChar) {
    return 'Password must contain at least one special character.'
  }

  return 'Password is valid!'
}
export function validateRequired(input?: string) {
  let validation: ValidationResult
  if (!input || input.trim() === '') {
    validation = {
      status: false,
      message: 'Required'
    }
    return validation
  }
  validation = {
    status: true
  }
  return validation
}

// Example usage:
const password = 'Test@1234'
const validationMessage = validatePassword(password)
console.log(validationMessage)
