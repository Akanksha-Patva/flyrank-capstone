// Pure validation functions — no React, no side effects, easy to unit test.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the "Full Name" field.
 * Leading/trailing whitespace is ignored before checking.
 * @param {string} value
 * @returns {string} error message, or "" if valid
 */
export function validateName(value) {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "Full name is required.";
  return "";
}

/**
 * Validates the "Email" field: required + must look like a real email.
 * Leading/trailing whitespace is ignored before checking.
 * @param {string} value
 * @returns {string} error message, or "" if valid
 */
export function validateEmail(value) {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_RE.test(trimmed)) return "Enter a valid email address.";
  return "";
}

/**
 * Runs all field validators against the current form values.
 * @param {{ fullName: string, email: string }} values
 * @returns {{ fullName: string, email: string }} map of field -> error message ("" = valid)
 */
export function validateForm(values) {
  return {
    fullName: validateName(values.fullName),
    email: validateEmail(values.email),
  };
}

/**
 * @param {Record<string, string>} errors
 * @returns {boolean} true if every field is error-free
 */
export function isFormValid(errors) {
  return Object.values(errors).every((message) => !message);
}