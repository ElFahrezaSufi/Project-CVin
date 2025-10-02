import React from 'react';
import clsx from 'classnames';

export default function Card({ children, className }) {
  return (
    <div className={clsx('bg-white rounded-2xl shadow-sm border border-gray-100 p-6', className)}>
      {children}
    </div>
  );
}
