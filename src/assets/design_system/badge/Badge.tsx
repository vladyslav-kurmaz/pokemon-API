const Badge = ({
  title,
  dot,
  cross,
  color,
  border,
  deleteBadge,
}: {
  title: string;
  dot?: boolean;
  cross?: boolean;
  color?: string;
  border?: string;
  deleteBadge?: () => void;
}) => {
  const changeBgColor = () => {
    switch (color) {
      case "state":
        return "bg-slate-300";
      case "red":
        return "bg-red-300";
      case "orange":
        return "bg-orange-300";
      case "lime":
        return "bg-lime-300";
      case "teal":
        return "bg-teal-300";
      case "cyan":
        return "bg-cyan-300";
      case "indigo":
        return "bg-indigo-300";
      case "violet":
        return "bg-violet-300";
      case "purpul":
        return "bg-purple-300";
      case "fuchsia":
        return "bg-fuchsia-300";
      case "pink":
        return "bg-pink-300";
      case "rose":
        return "bg-rose-300";
      case "black":
        return "bg-black";
      default:
        return "bg-slate-300";
    }
  };

  const changeColor = () => {
    switch (color) {
      case "state":
        return "text-stone-800";
      case "red":
        return "text-red-700";
      case "orange":
        return "text-orange-700";
      case "lime":
        return "text-lime-700";
      case "teal":
        return "text-teal-700";
      case "cyan":
        return "text-cyan-700";
      case "indigo":
        return "text-indigo-700";
      case "violet":
        return "text-violet-700";
      case "purpul":
        return "text-purple-700";
      case "fuchsia":
        return "text-fuchsia-700";
      case "pink":
        return "text-pink-700";
      case "rose":
        return "text-rose-700";
      case "black":
        return "text-white";
      default:
        return "text-black";
    }
  };

  const changeBorderRadius = () => {
    switch (border) {
      case "none":
        return "rounded-none";
      case "sm":
        return "rounded-sm";
      case "norm":
        return "rounded";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "xl":
        return "rounded-xl";
      case "2xl":
        return "rounded-2xl";
      case "3xl":
        return "rounded-3xl";
      case "full":
        return "rounded-full";
      default:
        return "rounded-sm";
    }
  };

  const dotElem = dot ? (
    <span className={`w-1 h-1 border-rounded mr-1 ${changeColor()}`}>●</span>
  ) : null;
  const CrossElem = cross ? (
    <span
      className={`w-3 h-3 border-rounded ml-1 ${changeColor()} absolute right-1 transition-all duration-200 cursor-pointer hover:scale-110 hover:transition-all hover:duration-200`}
      onClick={deleteBadge}
    >
      ×
    </span>
  ) : null;
  return (
    <div
      className={`${changeBgColor()} px-2.5 py-0.5 pr-2 box-content inline-block relative whitespace-nowrap ${changeBorderRadius()}`}
    >
      {dotElem}
      <span className={`${changeColor()} pr-2`}>{title}</span>
      {CrossElem}
    </div>
  );
};

export default Badge;
