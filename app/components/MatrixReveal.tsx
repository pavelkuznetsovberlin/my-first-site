"use client";

import { ReactNode, useMemo } from "react";

type Props = {
  active: boolean;
  children: ReactNode;
  className?: string;
  variant?: "card" | "full";
};

const CHARSET = "01AZXWMNQ%$&#@*+=/\\-|~{}[]<>?:;abcdefg";

function randomChars(length: number) {
  return Array.from({ length }, () => CHARSET[Math.floor(Math.random() * CHARSET.length)]).join("");
}

function buildMatrixAsset(): string {
  const width = 320;
  const height = 640;
  const rows = 60;
  const colorPool = ["%2383ff5f", "%2344e6af", "%234fc7ff", "%2374ff77"];

  const lines = Array.from({ length: rows }).map(() => {
    const x = Math.floor(Math.random() * (width - 40)) + 4;
    const y = Math.floor(Math.random() * (height - 20)) + 12;
    const fill = colorPool[Math.floor(Math.random() * colorPool.length)];
    const content = randomChars(3 + Math.floor(Math.random() * 6));
    return `<text x='${x}' y='${y}' fill='${fill}' font-size='14' font-family='monospace' letter-spacing='2'>${content}</text>`;
  });

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'><rect width='${width}' height='${height}' fill='black'/>${lines.join(
    ""
  )}</svg>`;
  const encoded = encodeURIComponent(svg);
  return `url("data:image/svg+xml,${encoded}")`;
}

export default function MatrixReveal({ active, children, className, variant = "card" }: Props) {
  const variantClass = variant === "full" ? "matrix-reveal--full" : "matrix-reveal--card";

  const assets = useMemo(() => [buildMatrixAsset(), buildMatrixAsset()], []);

  return (
    <div
      className={`matrix-reveal ${variantClass} relative isolate ${className ?? ""}`}
      style={
        {
          "--matrix-asset-1": assets[0],
          "--matrix-asset-2": assets[1],
        } as React.CSSProperties
      }
    >
      <div className={`matrix-reveal__veil ${active ? "matrix-reveal__veil--hidden" : ""}`} />
      <div className={`matrix-reveal__content ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        {children}
      </div>
    </div>
  );
}
