const Button = ({ className, children, isColorInverse, onClick }) => {
  return (
    <button
      className={`${
        isColorInverse
          ? "bg-transparent  text-primary-400 hover:bg-primary-400 hover:text-white"
          : "bg-primary-400 text-white hover:bg-transparent hover:text-primary-400"
      } border border-primary-400  py-[11px] px-7 font-semibold transition-all ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
