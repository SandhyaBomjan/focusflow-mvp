import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import PrivacyNote from '../components/common/PrivacyNote';

function LoginScreen({ form, errors, feedback, onChange, onSubmit, onSwitchToRegister, canSubmit }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <InputField
          id="login-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => onChange('email', event.target.value)}
          placeholder="student@university.edu"
          error={errors.email}
        />
        <InputField
          id="login-password"
          label="Password"
          type="password"
          value={form.password}
          onChange={(event) => onChange('password', event.target.value)}
          placeholder="Enter your password"
          error={errors.password}
        />
      </div>

      <PrivacyNote />

      {feedback ? <p className="text-sm text-amber-300">{feedback}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={onSubmit} disabled={!canSubmit} className="flex-1">
          Login
        </Button>
        <Button onClick={onSwitchToRegister} variant="secondary" className="flex-1">
          Create account
        </Button>
      </div>
    </div>
  );
}

export default LoginScreen;