// DataContacIcon.tsx
import React from 'react';

export interface DataContacIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  className?: string;
}

export const DataContacIcon: React.FC<DataContacIconProps> = ({
  size = 24,
  color = 'currentColor',
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-label="DataContac Icon"
      {...props}
    >
      <path
        d="M 60 72 L 60 48 C 60 38 68 30 78 30 L 126 30 C 136 30 144 38 144 48 L 144 54"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 60 128 L 60 152 C 60 162 68 170 78 170 L 126 170 C 136 170 144 162 144 152 L 144 146"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 152 74 C 158 82 161 91 161 100 C 161 109 158 118 152 126"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
      />
      <circle cx="36" cy="100" r="14" fill={color} />
      <circle cx="158" cy="44" r="14" fill={color} />
      <circle cx="158" cy="156" r="14" fill={color} />
      <path
        d="M 36 92 L 78 92 C 84 92 89 88 93 84 L 146 36 C 152 42 154 50 148 56 L 109 91 C 104 95 104 105 109 109 L 148 144 C 154 150 152 158 146 164 L 93 116 C 89 112 84 108 78 108 L 36 108 C 31.5 108 28 104.5 28 100 C 28 95.5 31.5 92 36 92 Z"
        fill={color}
      />
      <rect x="74" y="80" width="34" height="40" rx="10" fill={color} />
    </svg>
  );
};