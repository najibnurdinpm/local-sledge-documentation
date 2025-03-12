import { useState, useRef } from "react";
import { GradientText } from "../typography";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Link from "next/link";

type IButton = {
  as?: React.ElementType;
  children: string | JSX.Element | JSX.Element[];
  variant?: "borderAnimation" | "gradientBackground" | "arrow";
  active?: boolean;
  className?: string;
  buttonPosition?: "start" | "center" | "end";
  [key: string]: any;
  px?: string;
  py?: string;
  rounded?: string;
  bgColor?: string;
  borderColor?: string;
  textClass?: string;
  gradient?: string;
  wrapperClass?: string;
  count?: number;
  countClass?: string;
  animationOnCard?: boolean;
  inset?: string;
  textColor?: string;
};

export default function Button({
  as = "div",
  children,
  variant,
  active = false,
  buttonPosition = "start",
  className,
  gradient,
  wrapperClass = "",
  count = 0,
  inset = "inset-[-1000%]",
  countClass = "",
  ...props
}: IButton) {
  switch (variant) {
    case "borderAnimation":
      return (
        <ButtonBorderAnimation
          gradient={gradient}
          className={className}
          count={count}
          wrapperClass={wrapperClass}
          countClass={countClass}
          inset={inset}
          {...props}
        >
          {children}
        </ButtonBorderAnimation>
      );
    case "gradientBackground":
      return (
        <ButtonGradientBackground
          className={className}
          {...props}
          active={active}
          buttonPosition={buttonPosition}
        >
          {children}
        </ButtonGradientBackground>
      );
    case "arrow":
      return <ButtonArrow {...props}>{children}</ButtonArrow>;
    default:
      return (
        <ButtonBorderAnimation className={className} {...props}>
          {children}
        </ButtonBorderAnimation>
      );
  }
}

export function ButtonBorderAnimation({
  children,
  as = "div",
  className = "",
  px = "px-[20px]",
  py = "py-[11.2px]",
  rounded = "rounded-[360px]",
  gradient = "linear-gradient(155.8deg, #43C6AC 48.42%, #F8FFAE 49.16%, #151515 51.6%)",
  wrapperClass = "",
  count = 0,
  countClass = "",
  inset,
  bgColor = "bg-dark",
  textColor = "text-yellow-1",
  ...props
}: IButton) {
  const Component = props?.to ? Link : as;

  const [animation, setAnimation] = useState(false);

  const handleMouseEnter = () => {
    setAnimation(true);
  };

  const handleMouseLeave = () => {
    setAnimation(false);
  };

  const handleOnClick = () => {
    setAnimation(false);
  };

  const animationStyle = {
    backgroundImage: gradient,
    animation: `spin 4s linear infinite`,
    animationPlayState: "paused",
  };

  animationStyle.animationPlayState = !animation ? "paused" : "";

  return (
    <div className={`relative ${wrapperClass}`}>
      <Component
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleOnClick}
        className={`relative inline-flex overflow-hidden ${rounded} p-[1px] ${className}`}
        {...props}
      >
        <span
          style={{ ...animationStyle }}
          className={`absolute ${inset} animate-spin`}
        />
        <span
          className={`inline-flex ${py} ${px} h-full w-full cursor-pointer items-center justify-center ${rounded} ${bgColor} backdrop-filter-custom 
        text-[16px] leading-[17.6px] tracking-[-2%] font-[700] ${textColor}`}
        >
          {children}
        </span>
      </Component>
      {!count ? null : (
        <span
          className={`${countClass} absolute bg-[#F85538] font-inter text-[10px] leading-[11px] py-[4px] px-[6px] rounded-[570px]`}
        >
          2
        </span>
      )}
    </div>
  );
}

export function ButtonGradientBackground({
  as = "div",
  children,
  active = false,
  className = "",
  buttonPosition = "start",
  rounded = "rounded-[360px]",
  py = "py-[16.2px]",
  px = "px-[23.7px]",
  bgColor = "bg-transparent",
  borderColor = "border-gray-1",
  textClass = "font-[700] text-[14px] lg:text-[16px] leading-[17.6px] tracking-[-2%]",
  ...props
}: IButton) {
  const Component = props?.to ? Link : as;

  const divRef: any = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <>
      <Component
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${
          active
            ? "bg-[linear-gradient(101.77deg,#43C6AC_-13.42%,_#F8FFAE_109.68%)] text-[#000000]"
            : `${bgColor} border border-solid ${borderColor} text-gray-1`
        } relative transition ease-in-out flex items-center justify-center ${rounded} ${px} ${py} duration-500 font-sans ${textClass} ${className} ${
          buttonPosition === "center"
            ? "mx-auto"
            : buttonPosition === "end"
            ? "ml-auto"
            : ""
        } `}
        {...props}
      >
        <div
          ref={divRef}
          className={`pointer-events-none absolute ${rounded} -inset-px opacity-0 transition duration-300`}
          style={{
            opacity,
            background: `radial-gradient(60px circle at ${position.x}px ${position.y}px, rgb(248, 255, 174, 0.1), #0000000f)`,
          }}
        />
        {children}
      </Component>
    </>
  );
}

export function ButtonArrow({
  as = "div",
  children,
  className = "",
  animationOnCard,
  ...props
}: IButton) {
  const Component = props?.to ? Link : as;

  const buttonClasses = `${className} flex justify-end w-full mt-[46px]`;

  return (
    <Component className={buttonClasses} {...props}>
      <div className="flex space-x-[12px] items-center">
        <GradientText
          deg="137.65deg"
          className="from-[#43C6AC]/[9.65] to-[#F8FFAE]/[76.16]"
        >
          <AnimatePresence>
            {animationOnCard && (
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(103.92deg, #43C6AC 40.07%, #F8FFAE 83.15%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {children}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </GradientText>
      </div>
    </Component>
  );
}
