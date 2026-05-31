import Button from '../components/common/Button';

function ConfirmationScreen({ taskTitle, onBackToDashboard }) {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15 text-4xl text-emerald-300">
        ✓
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-white">Task added successfully</h2>
        <p className="text-sm leading-6 text-slate-300">
          <span className="font-semibold text-white">{taskTitle}</span> is now in your focus list. Small wins like this make it easier to stay organised.
        </p>
      </div>
      <Button onClick={onBackToDashboard}>Return to dashboard</Button>
    </div>
  );
}

export default ConfirmationScreen;