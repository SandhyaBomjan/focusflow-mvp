import { useEffect, useState } from 'react';
import {
  getTasks,
  createTask,
  completeTask,
  deleteTask,
} from './utils/api';
import AppShell from './components/layout/AppShell';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import { TOTAL_STEPS } from './data/screens';
import { hasValue, isEmailValid, isLoginValid, isRegisterValid, isTaskValid } from './utils/validation';

const initialLoginForm = { email: '', password: '' };
const initialRegisterForm = { name: '', email: '', password: '' };
const initialTaskForm = { title: '', details: '' };

const screenContent = {
  1: {
    eyebrow: 'Student productivity',
    title: 'Build clarity into every study day',
    description:
      'FocusFlow helps students move from stress to structure with a calm, guided task flow.',
  },
  2: {
    eyebrow: 'Welcome back',
    title: 'Login to continue your focus session',
    description: 'Use your local demo account details to access your dashboard and manage today’s priorities.',
  },
  3: {
    eyebrow: 'Your dashboard',
    title: 'See your tasks without the overwhelm',
    description: 'Track what matters next and keep your momentum with a clear, distraction-light overview.',
  },
  4: {
    eyebrow: 'Add a task',
    title: 'Capture the next important action',
    description: 'Write a clear task so you can focus on one manageable step instead of everything at once.',
  },
  5: {
    eyebrow: 'Success',
    title: 'You’re making progress',
    description: 'Every organised task is one less thing to hold in your head.',
  },
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [authMode, setAuthMode] = useState('login');
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [taskForm, setTaskForm] = useState(initialTaskForm);
  const [user, setUser] = useState({ name: 'User', email: '' });
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');
  const [lastAddedTask, setLastAddedTask] = useState('');
  const [dashboardMessage, setDashboardMessage] = useState('');

 const loadTasks = async () => {
  try {
    const fetchedTasks = await getTasks();
   setTasks(fetchedTasks);
  } catch (error) {
    console.error("Failed to load tasks:", error);
  }
};

useEffect(() => {
  loadTasks();
}, []);

const handleCompleteTask = async (id) => {
  try {
    const updatedTask = await completeTask(id);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? updatedTask : task
      )
    );
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteTask = async (id) => {
  try {
    await deleteTask(id);

    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};


  const clearMessages = () => {
    setErrors({});
    setFeedback('');
  };

  const handleLoginChange = (field, value) => {
    setLoginForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: '' }));
    setFeedback('');
  };

  const handleRegisterChange = (field, value) => {
    setRegisterForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: '' }));
    setFeedback('');
  };

  const handleTaskChange = (field, value) => {
    setTaskForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: '' }));
    setFeedback('');
  };

  const nextStep = () => setCurrentStep((previous) => Math.min(previous + 1, TOTAL_STEPS));

  const prevStep = () => {
    clearMessages();
    setCurrentStep((previous) => Math.max(previous - 1, 1));
  };

  const goToDashboard = () => {
    clearMessages();
    setCurrentStep(3);
  };

  const handleLoginSubmit = () => {
    const nextErrors = {};

    if (!hasValue(loginForm.email)) nextErrors.email = 'Email is required.';
    else if (!isEmailValid(loginForm.email)) nextErrors.email = 'Please enter a valid email address.';

    if (!hasValue(loginForm.password)) nextErrors.password = 'Password is required.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFeedback('Please complete the required fields before continuing.');
      return;
    }

    const derivedName = registerForm.name || loginForm.email.split('@')[0] || 'User';
    setUser({ name: derivedName, email: loginForm.email });
    localStorage.setItem("userEmail", loginForm.email);
    setDashboardMessage('Logged in locally. Your productivity space is ready.');
    clearMessages();
    setCurrentStep(3);
  };

  const handleRegisterSubmit = () => {
    const nextErrors = {};

    if (!hasValue(registerForm.name)) nextErrors.name = 'Name is required.';
    if (!hasValue(registerForm.email)) nextErrors.email = 'Email is required.';
    else if (!isEmailValid(registerForm.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!hasValue(registerForm.password)) nextErrors.password = 'Password is required.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFeedback('Please complete the required fields before continuing.');
      return;
    }

    setUser({ name: registerForm.name, email: registerForm.email });
    localStorage.setItem("userEmail", registerForm.email);
    setLoginForm({ email: registerForm.email, password: registerForm.password });
    setDashboardMessage('Account created locally. Welcome to FocusFlow.');
    clearMessages();
    setCurrentStep(3);
  };

   const handleTaskSubmit = async () => {
    console.log("HANDLE TASK SUBMIT RUNNING");
    console.log("EMAIL:", localStorage.getItem("userEmail"));
  const nextErrors = {};

  if (!hasValue(taskForm.title)) {
    nextErrors.title = 'Task title is required.';
  }

  if (Object.keys(nextErrors).length > 0) {
    setErrors(nextErrors);
    setFeedback('Add a task title so you know exactly what to focus on next.');
    return;
  }

  try {
    console.log("Creating task...");
    console.log(localStorage.getItem("userEmail")); 
    const newTask = await createTask({
      title: taskForm.title,
      details: taskForm.details,
      user_email: localStorage.getItem("userEmail"),
    });

    setTasks((previous) => [
      newTask,
      ...previous,
    ]);

    setLastAddedTask(newTask.title);
    setTaskForm(initialTaskForm);
    clearMessages();
    setCurrentStep(5);

  } catch (error) {
    console.error("Failed to create task:", error);
    setFeedback("Failed to save task.");
  }
};

  const renderStep = () => {
    if (currentStep === 1) {
      return <WelcomeScreen onGetStarted={nextStep} nextStep={nextStep} />;
    }

    if (currentStep === 2) {
      if (authMode === 'register') {
        return (
          <RegisterScreen
            form={registerForm}
            errors={errors}
            feedback={feedback}
            onChange={handleRegisterChange}
            onSubmit={handleRegisterSubmit}
            onSwitchToLogin={() => {
              clearMessages();
              setAuthMode('login');
            }}
            canSubmit={isRegisterValid(registerForm)}
            nextStep={nextStep}
            prevStep={prevStep}
            goToDashboard={goToDashboard}
          />
        );
      }

      return (
        <LoginScreen
          form={loginForm}
          errors={errors}
          feedback={feedback}
          onChange={handleLoginChange}
          onSubmit={handleLoginSubmit}
          onSwitchToRegister={() => {
            clearMessages();
            setAuthMode('register');
          }}
          canSubmit={isLoginValid(loginForm)}
          nextStep={nextStep}
          prevStep={prevStep}
          goToDashboard={goToDashboard}
        />
      );
    }

    if (currentStep === 3) {
      return (
  <DashboardScreen
  userName={user.name}
  tasks={tasks}
  successMessage={dashboardMessage}
  onAddTask={() => {
    setDashboardMessage('');
    nextStep();
  }}
  onCompleteTask={handleCompleteTask}
  onDeleteTask={handleDeleteTask}
  nextStep={nextStep}
  prevStep={prevStep}
  goToDashboard={goToDashboard}
/>
      );
    }

    if (currentStep === 4) {
      return (
        <AddTaskScreen
          form={taskForm}
          errors={errors}
          feedback={feedback}
          onChange={handleTaskChange}
          onSubmit={handleTaskSubmit}
          onCancel={() => {
            setTaskForm(initialTaskForm);
            prevStep();
          }}
          canSubmit={isTaskValid(taskForm)}
          nextStep={nextStep}
          prevStep={prevStep}
          goToDashboard={goToDashboard}
        />
      );
    }

    return (
      <ConfirmationScreen
        taskTitle={lastAddedTask}
        onBackToDashboard={() => {
          setDashboardMessage('Nice work — your new task is now part of your focus plan.');
          goToDashboard();
        }}
        nextStep={nextStep}
        prevStep={prevStep}
        goToDashboard={goToDashboard}
      />
    );
  };

  const currentMeta = screenContent[currentStep];

  return (
    <AppShell
      step={currentStep}
      totalSteps={TOTAL_STEPS}
      eyebrow={currentMeta.eyebrow}
      title={currentMeta.title}
      description={currentMeta.description}
    >
      {renderStep()}
    </AppShell>
  );
}

export default App;