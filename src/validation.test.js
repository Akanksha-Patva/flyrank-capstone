import { describe, it, expect } from "vitest";
import { validateName, validateEmail, validateForm, isFormValid } from "./validation";

describe("validateName", () => {
  it("rejects an empty string", () => {
    expect(validateName("")).not.toBe("");
  });

  it("rejects whitespace-only input", () => {
    expect(validateName("    ")).not.toBe("");
  });

  it("accepts a normal name", () => {
    expect(validateName("Alex Rivera")).toBe("");
  });

  it("accepts a name with leading/trailing whitespace", () => {
    expect(validateName("  Alex Rivera  ")).toBe("");
  });

  it("handles undefined/null gracefully", () => {
    expect(validateName(undefined)).not.toBe("");
    expect(validateName(null)).not.toBe("");
  });
});

describe("validateEmail", () => {
  it("rejects an empty string", () => {
    expect(validateEmail("")).not.toBe("");
  });

  it("rejects whitespace-only input", () => {
    expect(validateEmail("   ")).not.toBe("");
  });

  it("rejects a string with no @", () => {
    expect(validateEmail("alex.example.com")).not.toBe("");
  });

  it("rejects a string with no domain", () => {
    expect(validateEmail("alex@")).not.toBe("");
  });

  it("rejects a string with no top-level domain", () => {
    expect(validateEmail("alex@example")).not.toBe("");
  });

  it("rejects an address with spaces", () => {
    expect(validateEmail("alex rivera@example.com")).not.toBe("");
  });

  it("accepts a normal email", () => {
    expect(validateEmail("alex@example.com")).toBe("");
  });

  it("accepts an email with leading/trailing whitespace", () => {
    expect(validateEmail("  alex@example.com  ")).toBe("");
  });

  it("accepts a plus-tagged email", () => {
    expect(validateEmail("alex+settings@example.com")).toBe("");
  });

  it("accepts a subdomain email", () => {
    expect(validateEmail("alex@mail.example.co.uk")).toBe("");
  });
});

describe("validateForm", () => {
  it("returns no errors for a fully valid form", () => {
    const errors = validateForm({ fullName: "Alex Rivera", email: "alex@example.com" });
    expect(errors.fullName).toBe("");
    expect(errors.email).toBe("");
  });

  it("returns errors for every invalid field", () => {
    const errors = validateForm({ fullName: "", email: "not-an-email" });
    expect(errors.fullName).not.toBe("");
    expect(errors.email).not.toBe("");
  });
});

describe("isFormValid", () => {
  it("is true when every field is error-free", () => {
    expect(isFormValid({ fullName: "", email: "" })).toBe(true);
  });

  it("is false when any field has an error", () => {
    expect(isFormValid({ fullName: "Full name is required.", email: "" })).toBe(false);
  });
});