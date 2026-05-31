import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import PrivacyNote from '../components/common/PrivacyNote';

function RegisterScreen({ form, errors, feedback, onChange, onSubmit, onSwitchToLogin, canSubmit }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <InputField
          id="register-name"
          label="Name"
          value={form.name}
          onChange={(event) => onChange('name', event.target.value)}
          placeholder="Your name"
          error={errors.name}
        />
        <InputField
          id="register-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => onChange('email', event.target.value)}
          placeholder="student@university.edu"
          error={errors.email}
        />
        <InputField
          id="register-password"
          label="Password"
          type="password"
          value={form.password}
          onChange={(event) => onChange('password', event.target.value)}
          placeholder="Create a password"
          error={errors.password}
        />
      </div>

      <PrivacyNote />

      {feedback ? <p className="text-sm text-amber-300">{feedback}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={onSubmit} disabled={!canSubmit} className="flex-1">
          Register
        </Button>
        <Button onClick={onSwitchToLogin} variant="secondary" className="flex-1">
          Back to login
        </Button>
      </div>
    </div>
  );
}

export default RegisterScreen;