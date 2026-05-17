"use client";

import { memo } from "react";

interface RemoteCursorProps {
  x: number;
  y: number;
  name: string;
  color: string;
}

export const RemoteCursor = memo(({ x, y, name, color }: RemoteCursorProps) => {
  const label = name.length > 24 ? `${name.slice(0, 22)}…` : name;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d="M3 12 L3 1 L13 8 L8 8 L9.5 15 L7.5 16 L6 10 L3 12 Z"
        fill={color}
        stroke="white"
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <rect
        x={16}
        y={2}
        width={Math.min(label.length * 7 + 14, 200)}
        height={20}
        rx={4}
        fill={color}
      />
      <text
        x={22}
        y={17}
        fill="white"
        fontSize={12}
        fontWeight={600}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {label}
      </text>
    </g>
  );
});

RemoteCursor.displayName = "RemoteCursor";
