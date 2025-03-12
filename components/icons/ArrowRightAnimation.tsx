import { AnimatePresence, motion } from "framer-motion";

export interface IIcon {
  fill?: string;
  className?: string;
  isActive?: boolean;
  width?: string;
  height?: string;
  animationOnCard?: boolean;
};

export const ArrowRightAnimation = ({ animationOnCard }: IIcon) => {
  return (
    <>
      {animationOnCard && (
        <AnimatePresence>
          <motion.div
            className="bg-transparent w-fit h-fit"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 44L23.4405 43.9923C12.6588 43.6957 4 34.8529 4 24C4 12.98 12.96 4 24 4C35.02 4 44 12.98 44 24C44 35.04 35.02 44 24 44ZM20.04 32C20.64 32.6 21.58 32.6 22.16 32L29.14 25.06C29.42 24.78 29.58 24.4 29.58 24C29.58 23.6 29.42 23.22 29.14 22.94L22.16 16C21.88 15.7 21.5 15.56 21.12 15.56C20.72 15.56 20.34 15.7 20.04 16C19.46 16.6 19.46 17.54 20.06 18.12L25.96 24L20.06 29.88C19.46 30.46 19.46 31.42 20.04 32Z"
                fill="url(#paint0_linear_1_549)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_549"
                  x1="7"
                  y1="56.5"
                  x2="44"
                  y2="10"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#43C6AC" />
                  <stop offset="1" stopColor="#F8FFAE" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </AnimatePresence>
      )}
      {!animationOnCard && (
        <AnimatePresence>
          <motion.div
            className="bg-transparent w-fit h-fit"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4C35.028 4 44 12.972 44 24C44 35.028 35.028 44 24 44C12.972 44 4 35.028 4 24C4 12.972 12.972 4 24 4ZM24 7C14.626 7 7 14.626 7 24C7 33.374 14.626 41 24 41C33.374 41 41 33.374 41 24C41 14.626 33.374 7 24 7ZM22.1752 15.9954L29.1472 22.9374C29.4292 23.2194 29.5872 23.6014 29.5872 23.9994C29.5872 24.3994 29.4292 24.7814 29.1472 25.0634L22.1752 32.0034C21.8832 32.2954 21.4992 32.4414 21.1172 32.4414C20.7332 32.4414 20.3472 32.2954 20.0552 31.9994C19.4712 31.4114 19.4732 30.4634 20.0592 29.8794L25.9632 23.9994L20.0592 18.1214C19.4732 17.5374 19.4712 16.5874 20.0552 15.9994C20.6392 15.4094 21.5872 15.4134 22.1752 15.9954Z"
                fill="#9C9C9C"
              />
            </svg>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
