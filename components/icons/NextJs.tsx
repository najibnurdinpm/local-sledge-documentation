export interface INextJs {
  width: number;
  height: number;
  color?: string;
}

export const NextJs = ({ width, height, color = "white" }: INextJs) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.95865 19.948C15.4587 19.948 19.9173 15.4941 19.9173 10C19.9173 4.50587 15.4587 0.0519905 9.95865 0.0519905C4.45864 0.0519905 0 4.50587 0 10C0 15.4941 4.45864 19.948 9.95865 19.948Z"
        fill={color}
      />
      <path
        d="M16.5434 17.4634L7.65144 6.02081H5.97559V13.9761H7.31611V7.7213L15.4915 18.2732C15.8603 18.026 16.212 17.7556 16.5434 17.4634Z"
        fill="url(#paint0_linear_2526_7495)"
      />
      <path
        d="M14.0532 6.02081H12.7251V13.9792H14.0532V6.02081Z"
        fill="url(#paint1_linear_2526_7495)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2526_7495"
          x1="10.3253"
          y1="14.1627"
          x2="13.8505"
          y2="18.5365"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#151515" />
          <stop offset={1} stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2526_7495"
          x1="13.3882"
          y1="6.01857"
          x2="13.3643"
          y2="11.8631"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset={1} stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};
