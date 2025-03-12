export interface IBadge {
  as?: React.ElementType;
  children?: string | JSX.Element | JSX.Element[];
  [key: string]: any;
  htmlFor?: string;
  checked?: string;
  value?: string;
  height?: string;
  pY?: string;
  pX?: string;
  color?: string;
  checkedColor?: string;
  size?: string;
  gradient?: string;
  rounded?: string;
  textTransform?: "uppercase" | "capitalize";
  className?: string;
  parentClassName?: string;
  type?: "badge" | "bubble";
};

export const Badge = ({
  as = "span",
  children,
  htmlFor,
  checked,
  value,
  height = "h-[16px]",
  pY = "py-[3px]",
  pX = "px-[6px]",
  color = "text-yellow-1",
  checkedColor = "",
  size = "text-[10px]",
  gradient = "bg-[linear-gradient(180deg,_#43C6AC_49%,_#F8FFAE_53%)]",
  rounded = "rounded-[360px]",
  className = "",
  parentClassName = "",
  textTransform = "uppercase",
  type = "badge",
  ...props
}: IBadge) => {
  const Component = as;

  let checkedClass = "";
  let checkedColorClass = "";

  if (checked === value) {
    checkedClass = gradient;
    checkedColorClass = "text-white";
  }

  const parentClasses = `relative ${height} flex items-center overflow-hidden ${rounded} p-[1px] text-[10px] leading-[10px]`;
  const parentBubbleClasses = `relative ${height} flex items-center overflow-hidden ${rounded} p-[1px] text-[10px] leading-[10px]`;
  const childClasses = `${pY} ${pX} ${
    checked === value ? checkedColorClass : color
  } ${size} ${color} inline-flex items-center justify-center h-full w-full cursor-pointer ${rounded} bg-[#191919] font-inter ${textTransform} font-[500] backdrop-filter-custom whitespace-nowrap`;

  return (
    <div className={`relative ${parentClassName} font-['inter']`}>
      {type === "badge" && (
        <Component
          htmlFor={htmlFor}
          className={`${className} ${parentClasses}`}
          {...props}
        >
          <span
            className={`[animation-play-state:paused] group-hover:[animation-play-state:running] absolute ${rounded} inset-[-1000%] animate-[spin_2s_linear_infinite] ${checkedClass}`}
          />
          <div className={childClasses}>{children}</div>
        </Component>
      )}
      {type === "bubble" && (
        <Component
          htmlFor={htmlFor}
          className={`${parentBubbleClasses} ${className} bubble`}
          {...props}
        >
          <span
            className={`absolute ${rounded} inset-[-1000%] animate-[spin_2s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running] ${checkedClass}`}
          />
          <div className={childClasses}>{children}</div>
        </Component>
      )}
    </div>
  );
}
