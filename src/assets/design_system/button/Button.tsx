

const Button = ({
  text,
  type,
  size,
  icon,
  arrow,
  disabled,
  handle
}: {
  text: string;
  type?: string;
  size?: string;
  icon?: string;
  arrow?: string;
  disabled?: boolean;
  handle: React.Dispatch<React.SetStateAction<number>>
}) => {


  
  const chooseType = () => {
    switch (type) {
      case "outline":
        return {
          bg: "bg-transparent hover:bg-indigo-100 active:bg-indigo-100 focus:bg-indigo-100 disabled:bg-slate-100 hover:transition-all hover:duration-300",
          border:
            "border border-solid border-indigo-500 hover:border-indigo-500 active:border-indigo-500 disabled:border-slate-100 focus:border-indigo-700 hover:transition-all hover:duration-300",
          color:
            "text-indigo-700 hover:text-indigo-500 active:text-indigo-500 disabled:text-slate-200 focus:text-indigo-700",
        };
      case "primary":
        return {
          bg: "bg-violet-700 hover:bg-violet-400 active:bg-violet-400 focus:bg-violet-400 disabled:bg-slate-300 hover:transition-all hover:duration-300",
          border:
            "border border-solid border-bg-violet-700 hover:border-violet-400 active:border-violet-400 disabled:border-slate-100 focus:border-indigo-700 hover:transition-all hover:duration-300",
          color: "text-white",
        };
      case "text":
        return {
          bg: "bg-transparent hover:bg-indigo-100 active:bg-indigo-100 disabled:bg-slate-100 focus:bg-transparent hover:transition-all hover:duration-300",
          border:
            "border border-solid border-transparent hover:border-indigo-100 active:border-indigo-100 disabled:border-slate-100 focus:border-indigo-700 hover:transition-all hover:duration-300",
          color:
            "text-black hover:text-indigo-500 active:text-indigo-500 focus:text-indigo-700",
        };

      default:
        return {
          bg: "bg-violet-700 hover:bg-violet-400 active:bg-violet-400 focus:bg-violet-400 disabled:bg-slate-100 hover:transition-all hover:duration-300",
          border:
            "border border-solid border-bg-violet-700 hover:border-violet-400 active:border-violet-400 disabled:border-slate-100 focus:border-indigo-700 hover:transition-all hover:duration-300",
          color: "text-white",
        };
    }
  };

  const chooseSize = () => {
    switch (size) {
      case "xs":
        return "max-w-16 w-full h-5 text-xs";
      case "sm":
        return "max-w-20 w-full h-6 text-sm";
      case "base":
        return "max-w-24 w-full h-8 text-base";
      case "lg":
        return "max-w-28 w-full h-10 text-lg";
      case "xl":
        return "max-w-32 w-full h-12 text-xl";
    }
  };

  const iconElem = icon ? <img src={icon} className="mr-1" /> : null;
  const arrowElem = arrow ? <span className="ml-1">{arrow}</span> : null;
  return (
    <button
      className={`${chooseType().bg} ${chooseType().border} ${
        chooseType().color
      } ${chooseSize()} rounded outline-none px-2 py-1 transition-all box-border duration-300 flex justify-center items-center`}
      disabled={disabled ? disabled : false}
      onClick={() => handle(0)}
    >
      {iconElem}
      {/* <span className="mr-1">🟊</span> */}
      {text}
      {arrowElem}
    </button>
  );
};

export default Button;
