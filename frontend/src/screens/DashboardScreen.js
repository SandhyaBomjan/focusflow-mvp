import Button from '../components/common/Button';
import EmptyState from '../components/dashboard/EmptyState';
import TaskSummary from '../components/dashboard/TaskSummary';

function DashboardScreen({
  userName,
  tasks,
  successMessage,
  onAddTask,
  onCompleteTask,
  onDeleteTask,
  onLogout,
}) {

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-teal-400/20 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 p-5">
        <div className="flex justify-between items-start">
  <p className="text-sm text-teal-200">
    Hello {userName || 'User'}!
  </p>

  <button
    onClick={onLogout}
    className="rounded bg-red-600 px-4 py-2 text-sm text-white"
  >
    Logout
  </button>
</div>
        <h2 className="mt-2 text-2xl font-bold text-white">Here’s your focus dashboard for today.</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Review your priorities, keep your next task visible, and build momentum one step at a time.
        </p>
      </div>

      {successMessage ? (
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </div>
      ) : null}

      <TaskSummary tasks={tasks} />

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">Task overview</h3>
          <Button onClick={onAddTask}>Add task</Button>
        </div>

        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{task.title}</p>
                    {task.details ? <p className="mt-1 text-sm text-slate-400">{task.details}</p> : null}
                  </div>
                  <div className="flex flex-col gap-2 items-end">
  <span className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-200">
    {task.completed ? 'Done' : 'Queued'}
  </span>

  {!task.completed && (
    <button
      onClick={() => onCompleteTask(task.id)}
      className="rounded bg-green-600 px-3 py-1 text-xs text-white"
    >
      Complete
    </button>
  )}

  <button
    onClick={() => onDeleteTask(task.id)}
    className="rounded bg-red-600 px-3 py-1 text-xs text-white"
  >
    Delete
  </button>
</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardScreen;