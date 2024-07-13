import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return (
    <div className="container text-lg text-black mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  );
};
