function InputField({ label, id, type = 'text', value, onChange, placeholder, error }) {
  return (
    <label className="block text-left" htmlFor={id}>
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-2xl border bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 ${
          error
            ? 'border-rose-400 focus:border-rose-300'
            : 'border-white/10 focus:border-teal-300'
        }`}
      />
      {error ? <span className="mt-2 block text-sm text-rose-300">{error}</span> : null}
    </label>
  );
}

export default InputField;