import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import PrivacyNote from '../components/common/PrivacyNote';

function AddTaskScreen({ form, errors, feedback, onChange, onSubmit, onCancel, canSubmit }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <InputField
          id="task-title"
          label="Task title"
          value={form.title}
          onChange={(event) => onChange('title', event.target.value)}
          placeholder="Finish lecture notes"
          error={errors.title}
        />
        <InputField
          id="task-details"
          label="Task details"
          value={form.details}
          onChange={(event) => onChange('details', event.target.value)}
          placeholder="Break it into a simple, specific action"
        />
      </div>

      <PrivacyNote />

      {feedback ? <p className="text-sm text-rose-300">{feedback}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={onSubmit} disabled={!canSubmit} className="flex-1">
          Save task
        </Button>
        <Button onClick={onCancel} variant="secondary" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default AddTaskScreen;