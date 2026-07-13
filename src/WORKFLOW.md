# AI Workflow Comparison

## Overview

For this exercise, I implemented the same React Settings Form feature using two different AI prompting approaches. The first implementation used a very simple prompt: "Create a React settings form." The second implementation used a structured prompt with clear requirements, project context, accessibility expectations, validation rules, verification steps, and a request for tests. The goal was to compare how prompt quality affects the quality of AI-generated code.

## Correctness

The vague prompt produced a functional settings form with basic validation and state management. However, it relied heavily on inline styles and did not include tests or a verification process. The structured prompt produced a cleaner implementation with separate CSS, stronger validation requirements, improved accessibility, and a more organized component structure.

## Accessibility

The structured implementation improved accessibility by using visible labels, `aria-invalid` for invalid fields, keyboard-friendly controls, and clearer validation feedback. These improvements make the form more usable for different users.

## Edge Cases

The structured workflow considered several edge cases, including empty fields, invalid email formats, leading and trailing whitespace, repeated submissions, and proper handling of toggle switches.

## Review Effort

The vague implementation required more manual review because requirements were not clearly defined. The structured implementation required less review because the prompt specified project structure, validation, accessibility, and verification from the beginning.

## AI Mistake I Caught

One issue I noticed was that the initial AI-generated version relied entirely on inline styles instead of separating styling into a CSS file. I corrected this in the structured version by requesting a separate stylesheet and a cleaner project structure.

## Conclusion

This exercise showed that detailed prompts significantly improve AI-generated code. Providing implementation plans, constraints, accessibility requirements, and verification instructions resulted in cleaner, more maintainable, and more reliable code while reducing manual review effort.