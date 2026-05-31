function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/40 p-5 text-center">
      <p className="text-sm font-medium text-slate-200">No tasks yet</p>
      <p className="mt-2 text-sm text-slate-400">Add your first task to turn overwhelm into a clear next action.</p>
    </div>
  );
}

export default EmptyState;