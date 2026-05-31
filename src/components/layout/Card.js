function Card({ children }) {
  return (
    <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur xl:p-8">
      {children}
    </div>
  );
}

export default Card;