import React from "react";

function Card({ className = '', ...props }) {
  return (
    <div
      className={`bg-white text-gray-900 flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm ${className}`}
      {...props}
    />
  );
}

function CardHeader({ className = '', ...props }) {
  return (
    <div
      className={`px-6 pt-6 ${className}`}
      {...props}
    />
  );
}

function CardTitle({ className = '', ...props }) {
  return (
    <h4
      className={`leading-none ${className}`}
      {...props}
    />
  );
}

function CardDescription({ className = '', ...props }) {
  return (
    <p
      className={`text-gray-600 ${className}`}
      {...props}
    />
  );
}

function CardContent({ className = '', ...props }) {
  return (
    <div
      className={`px-6 pb-6 ${className}`}
      {...props}
    />
  );
}

function CardFooter({ className = '', ...props }) {
  return (
    <div
      className={`flex items-center px-6 pb-6 ${className}`}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}
