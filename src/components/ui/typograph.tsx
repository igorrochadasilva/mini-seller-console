import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight ${className}`}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={`scroll-m-20 text-3xl font-bold tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className }: TypographyProps) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-medium tracking-tight ${className}`}
    >
      {children}
    </h4>
  );
}

export function TypographyH5({ children, className }: TypographyProps) {
  return (
    <h5
      className={`scroll-m-20 text-lg font-medium tracking-tight ${className}`}
    >
      {children}
    </h5>
  );
}

export function TypographyP({ children, className }: TypographyProps) {
  return <p className={`scroll-m-20 text-base ${className}`}>{children}</p>;
}
