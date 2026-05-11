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
        <label className="block text-sm font-semibold text-amber-400 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 bg-gray-800 border rounded text-white placeholder-gray-500 focus:outline-none transition-colors ${
          error ? 'border-red-500 focus:border-red-400' : 'border-gray-700 focus:border-amber-500'
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}