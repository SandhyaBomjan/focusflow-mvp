import Card from './Card';
import ProgressIndicator from './ProgressIndicator';

function AppShell({ step, totalSteps, eyebrow = 'Student productivity', title, description, children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.18),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_50%,_#111827_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <Card>
          <div className="space-y-8">
            <ProgressIndicator step={step} total={totalSteps} />

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-200">{eyebrow}</p>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
                <p className="max-w-lg text-sm leading-6 text-slate-300 sm:text-base">{description}</p>
              </div>
            </div>

            {children}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AppShell;