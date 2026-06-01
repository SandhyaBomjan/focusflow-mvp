function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary:
      'bg-teal-500 text-white shadow-lg shadow-teal-500/20 hover:bg-teal-400 focus:ring-teal-300',
    secondary:
      'bg-white/10 text-slate-100 hover:bg-white/15 focus:ring-slate-300',
    ghost: 'bg-transparent text-teal-200 hover:text-teal-100 focus:ring-teal-300',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;