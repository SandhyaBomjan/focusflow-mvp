function ProgressIndicator({ step, total }) {
  const progressWidth = `${(step / total) * 100}%`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        <span>FocusFlow journey</span>
        <span>{`Step ${step} of ${total}`}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 transition-all duration-300" style={{ width: progressWidth }} />
      </div>
    </div>
  );
}

export default ProgressIndicator;