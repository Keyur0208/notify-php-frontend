import clsx from "clsx";

export function DropdownIcon({ isOpen }:any) {
    return (
      <svg
        width="10"
        height="10"
        viewBox="0 0 300 164"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(
          "transition-transform duration-300 ease-in-out",
          isOpen && "rotate-180"
        )}
      >
        <path
          d="M276.272 0.506836H23.6857C3.20568 0.506836 -7.03433 25.2535 7.47234 39.7602L117.979 150.267C135.686 167.973 164.486 167.973 182.192 150.267L224.219 108.24L292.699 39.7602C306.992 25.2535 296.752 0.506836 276.272 0.506836Z"
        />
      </svg>
    );
  }
  