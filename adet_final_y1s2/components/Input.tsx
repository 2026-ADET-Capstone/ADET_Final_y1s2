'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  fullWidth = true,
  ...props
}: InputProps) {
  return (
    <div className={fullWidth ? 'w-full' : 'inline-block'}>
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 bg-white border rounded text-gray-900 placeholder-gray-400 focus:outline-none transition-colors ${
          error ? 'border-red-500 focus:border-red-400' : 'border-gray-300 focus:border-blue-900'
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}