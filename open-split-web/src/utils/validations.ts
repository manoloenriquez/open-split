/**
 * Validation utility functions
 */

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phone: string): boolean {
  // Philippine phone number format
  const phoneRegex = /^(\+63|0)?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters
  return password.length >= 8;
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");
  
  // Format as +63 XXX XXX XXXX
  if (cleaned.startsWith("63")) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  if (cleaned.startsWith("0")) {
    return `+63 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

