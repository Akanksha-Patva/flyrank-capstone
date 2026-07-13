import { useState } from "react";
import "./SettingsForm.css";
import { validateForm, isFormValid } from "./validation";

const DEFAULT_VALUES = {
  fullName: "",
  email: "",
  bio: "",
  theme: "System",
  emailNotifications: true,
  marketingEmails: false,
};

function SettingsForm() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  // Tracks which fields the user has interacted with, so errors only
  // appear after a field has been touched (not on first render).
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);

  // Re-computed on every render — cheap, and keeps a single source
  // of truth for validity instead of duplicating it in state.
  const errors = validateForm(values);
  const formValid = isFormValid(errors);

  function updateField(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Editing again after a successful save clears the confirmation,
    // so it doesn't linger next to a form the user is now changing.
    if (success) setSuccess(false);
  }

  function markTouched(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // no page reload
    setTouched({ fullName: true, email: true });
    if (!formValid) return;

    // Placeholder for a real save (API call, etc.). This form only
    // needs to confirm the save locally.
    setSuccess(true);
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <h1 className="settings-form__title">Account Settings</h1>

      {success && (
        <p className="settings-form__success" role="status">
          Your settings have been saved.
        </p>
      )}

      <div className="form-field">
        <label htmlFor="fullName" className="form-field__label">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          className="form-field__input"
          value={values.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          onBlur={() => markTouched("fullName")}
          aria-invalid={Boolean(touched.fullName && errors.fullName)}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
        />
        {touched.fullName && errors.fullName && (
          <p id="fullName-error" className="form-field__error">
            {errors.fullName}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email" className="form-field__label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-field__input"
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
          onBlur={() => markTouched("email")}
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {touched.email && errors.email && (
          <p id="email-error" className="form-field__error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="bio" className="form-field__label">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          className="form-field__textarea"
          rows={3}
          value={values.bio}
          onChange={(e) => updateField("bio", e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="theme" className="form-field__label">
          Theme
        </label>
        <select
          id="theme"
          name="theme"
          className="form-field__select"
          value={values.theme}
          onChange={(e) => updateField("theme", e.target.value)}
        >
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
          <option value="System">System</option>
        </select>
      </div>

      <div className="form-field form-field--toggle">
        <label htmlFor="emailNotifications" className="form-field__label">
          Email Notifications
        </label>
        <input
          id="emailNotifications"
          name="emailNotifications"
          type="checkbox"
          className="toggle-input"
          checked={values.emailNotifications}
          onChange={(e) => updateField("emailNotifications", e.target.checked)}
        />
      </div>

      <div className="form-field form-field--toggle">
        <label htmlFor="marketingEmails" className="form-field__label">
          Marketing Emails
        </label>
        <input
          id="marketingEmails"
          name="marketingEmails"
          type="checkbox"
          className="toggle-input"
          checked={values.marketingEmails}
          onChange={(e) => updateField("marketingEmails", e.target.checked)}
        />
      </div>

      <button type="submit" className="save-button" disabled={!formValid}>
        Save Changes
      </button>
    </form>
  );
}

export default SettingsForm;