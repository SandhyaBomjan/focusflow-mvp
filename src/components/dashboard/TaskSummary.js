function TaskSummary({ tasks }) {
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total tasks</p>
        <p className="mt-2 text-3xl font-bold text-white">{tasks.length}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Completed</p>
        <p className="mt-2 text-3xl font-bold text-emerald-300">{completedCount}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Focus tip</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">Break big tasks into one calm next step.</p>
      </div>
    </div>
  );
}

export default TaskSummary;