import { useState } from "react";

// -----------------------------------------------------------------
// SettingsForm — a small, realistic "account settings" form.
// Built to teach: useState, controlled inputs, validation,
// conditional rendering, and clean component structure.
// -----------------------------------------------------------------

export default function SettingsForm() {
  // 1) All form data lives in ONE state object.
  //    This is a common pattern once a form has more than 2-3 fields.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    theme: "dark",
    emailNotifications: true,
    marketingEmails: false,
  });

  // 2) Track validation errors separately from the data itself.
  const [errors, setErrors] = useState({});

  // 3) Track whether we just saved, to show a success message.
  const [saved, setSaved] = useState(false);

  // A single change handler for every text/textarea input.
  // "name" on the input must match the key in formData.
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  }

  // A separate handler for toggle switches (booleans).
  function handleToggle(field) {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
    setSaved(false);
  }

  function handleThemeChange(theme) {
    setFormData((prev) => ({ ...prev, theme }));
    setSaved(false);
  }

  // Simple validation — runs before we "save".
  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser's default full-page reload
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // In a real app, this is where you'd call an API:
      // await fetch("/api/settings", { method: "POST", body: JSON.stringify(formData) })
      console.log("Saving settings:", formData);
      setSaved(true);
    }
  }

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit} noValidate>
        <div style={styles.header}>
          <h1 style={styles.title}>Account settings</h1>
          <p style={styles.subtitle}>
            Update your profile and choose how FlyRank contacts you.
          </p>
        </div>

        {/* ---------------- Profile section ---------------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Profile</h2>

          <label style={styles.label} htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Akanksha Patva"
            style={{
              ...styles.input,
              borderColor: errors.name ? "#e2665b" : "#2c3542",
            }}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}

          <label style={styles.label} htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            style={{
              ...styles.input,
              borderColor: errors.email ? "#e2665b" : "#2c3542",
            }}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <label style={styles.label} htmlFor="bio">
            Short bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Frontend AI Engineering Intern, learning React..."
            rows={3}
            style={{ ...styles.input, resize: "vertical" }}
          />
        </section>

        {/* ---------------- Appearance section ---------------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Appearance</h2>
          <div style={styles.themeRow}>
            {["light", "dark", "system"].map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => handleThemeChange(option)}
                style={{
                  ...styles.themeButton,
                  ...(formData.theme === option ? styles.themeButtonActive : {}),
                }}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* ---------------- Notifications section ---------------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Notifications</h2>

          <ToggleRow
            label="Email notifications"
            description="Get notified about activity on your account."
            checked={formData.emailNotifications}
            onChange={() => handleToggle("emailNotifications")}
          />

          <ToggleRow
            label="Marketing emails"
            description="Occasional product updates and tips."
            checked={formData.marketingEmails}
            onChange={() => handleToggle("marketingEmails")}
          />
        </section>

        {/* ---------------- Footer ---------------- */}
        <div style={styles.footer}>
          {saved && <span style={styles.savedText}>Settings saved</span>}
          <button type="submit" style={styles.saveButton}>
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

// A small reusable component for a toggle switch row.
// Pulling this out keeps the main form readable.
function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div style={styles.toggleRow}>
      <div>
        <p style={styles.toggleLabel}>{label}</p>
        <p style={styles.toggleDescription}>{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        style={{
          ...styles.switchTrack,
          background: checked ? "#3fb98f" : "#2c3542",
        }}
      >
        <span
          style={{
            ...styles.switchThumb,
            transform: checked ? "translateX(18px)" : "translateX(2px)",
          }}
        />
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#12161c",
    display: "flex",
    justifyContent: "center",
    padding: "48px 20px",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 480,
    background: "#181d25",
    border: "1px solid #232a35",
    borderRadius: 14,
    padding: "32px 28px",
  },
  header: { marginBottom: 24 },
  title: {
    color: "#f2f4f7",
    fontSize: 22,
    fontWeight: 600,
    margin: 0,
    letterSpacing: "-0.01em",
  },
  subtitle: {
    color: "#8a93a3",
    fontSize: 14,
    marginTop: 6,
    lineHeight: 1.5,
  },
  section: {
    borderTop: "1px solid #232a35",
    paddingTop: 20,
    marginTop: 20,
  },
  sectionTitle: {
    color: "#c7cdd6",
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: "0 0 14px 0",
  },
  label: {
    display: "block",
    color: "#aab2bf",
    fontSize: 13,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#12161c",
    border: "1px solid #2c3542",
    borderRadius: 8,
    padding: "10px 12px",
    color: "#f2f4f7",
    fontSize: 14,
    outline: "none",
  },
  error: {
    color: "#e2665b",
    fontSize: 12,
    marginTop: 4,
  },
  themeRow: { display: "flex", gap: 8 },
  themeButton: {
    flex: 1,
    padding: "10px 0",
    borderRadius: 8,
    border: "1px solid #2c3542",
    background: "#12161c",
    color: "#aab2bf",
    fontSize: 13,
    cursor: "pointer",
  },
  themeButtonActive: {
    background: "#1f2e2a",
    borderColor: "#3fb98f",
    color: "#7fe3c4",
  },
  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
  },
  toggleLabel: { color: "#f2f4f7", fontSize: 14, margin: 0 },
  toggleDescription: { color: "#767f8c", fontSize: 12, margin: "2px 0 0 0" },
  switchTrack: {
    width: 40,
    height: 22,
    borderRadius: 999,
    border: "none",
    position: "relative",
    cursor: "pointer",
    flexShrink: 0,
  },
  switchThumb: {
    position: "absolute",
    top: 2,
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "#f2f4f7",
    transition: "transform 0.15s ease",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 14,
    marginTop: 26,
  },
  savedText: { color: "#7fe3c4", fontSize: 13 },
  saveButton: {
    background: "#3fb98f",
    color: "#0d1310",
    border: "none",
    borderRadius: 8,
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
};