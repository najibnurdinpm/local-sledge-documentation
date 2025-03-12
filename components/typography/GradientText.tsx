import React from "react";

export interface IGradientText {
  className: string;
  deg: string;
  children: string | JSX.Element | JSX.Element[] | HTMLElement | any;
};

export const GradientText = ({
  children,
  deg,
  className,
}: IGradientText) => {
  return (
    <span
      className={`gradient-text ${className}`}
      style={{
        backgroundImage: `linear-gradient(${deg}, var(--tw-gradient-stops))`,
      }}
    >
      {children}
    </span>
  );
}
