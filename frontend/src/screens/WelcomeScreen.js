import Button from '../components/common/Button';
import LogoMark from '../components/common/LogoMark';

function WelcomeScreen({ onGetStarted }) {
  return (
    <div className="space-y-8 text-center">
      <div className="flex justify-center">
        <LogoMark />
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">FocusFlow</h2>
        <p className="mx-auto max-w-md text-base leading-7 text-slate-300">
          A calm study companion that helps university students organise tasks, reduce stress, and focus on what matters next.
        </p>
      </div>

      <Button onClick={onGetStarted} className="w-full sm:w-auto">
        Get Started
      </Button>
    </div>
  );
}

export default WelcomeScreen;