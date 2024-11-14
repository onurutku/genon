export type ValidationResult = {
  status: boolean
  message?: string
}
export function validateEmail(
  isTouched: boolean,
  isDirty: boolean,
  input?: string
): ValidationResult {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  let validation: ValidationResult = {
    status: false
  }
  if (isTouched) {
    if (!input) {
      validation = {
        status: false,
        message: '*Required'
      }
    } else if (!regex.test(input)) {
      validation = {
        status: false,
        message: 'Invalid email format'
      }
    } else {
      validation = {
        status: true
      }
    }
  }
  return validation
}
let pass: string | undefined
export function validatePassword(
  isTouched: boolean,
  isDirty: boolean,
  input?: string
) {
  pass = input
  let validation: ValidationResult = {
    status: false
  }
  if (isTouched) {
    if (!input) {
      validation = {
        status: false,
        message: '*Required'
      }
    } else if (isDirty) {
      // Password should be at least 8 characters long
      const minLength = 8
      const maxLength = 50

      // Regular expression checks:
      const hasUpperCase = /[A-Z]/.test(input) // At least one uppercase letter
      const hasLowerCase = /[a-z]/.test(input) // At least one lowercase letter
      const hasDigits = /\d/.test(input) // At least one number
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(input) // At least one special character

      // Validate password
      if (input.length < minLength) {
        validation = {
          status: false,
          message: 'Password must be at least 8 characters long'
        }
        return validation
      }
      if (input.length > maxLength) {
        validation = {
          status: false,
          message: 'Password must not exceed 50 characters'
        }
        return validation
      }
      if (!hasUpperCase) {
        validation = {
          status: false,
          message: 'Password must contain at least one uppercase letter'
        }
        return validation
      }
      if (!hasLowerCase) {
        validation = {
          status: false,
          message: 'Password must contain at least one lowercase letter'
        }
        return validation
      }
      if (!hasDigits) {
        validation = {
          status: false,
          message: 'Password must contain at least one number'
        }
        return validation
      }
      if (!hasSpecialChar) {
        validation = {
          status: false,
          message: 'Password must contain at least one special character'
        }
        return validation
      }
      return (validation = {
        status: true
      })
    }
  }
  return validation
}
export function validateConfirmPassword(
  isTouched: boolean,
  isDirty: boolean,
  input?: string,
  confirmPassword?: string
) {
  let validation: ValidationResult = {
    status: false
  }
  if (isTouched) {
    if (!input) {
      validation = {
        status: false,
        message: '*Required'
      }
    } else if (pass !== input) {
      validation = {
        status: false,
        message: 'Passwords should match'
      }
      return validation
    } else {
      validation = {
        status: true
      }
    }
  }
  return validation
}
export function validateRequired(
  isTouched: boolean,
  isDirty: boolean,
  input?: string
) {
  let validation: ValidationResult = {
    status: false
  }
  if (isTouched) {
    if (!input) {
      validation = {
        status: false,
        message: '*Required'
      }
    } else {
      validation = {
        status: true
      }
    }
  }
  return validation
}
