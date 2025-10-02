import React from 'react';
import clsx from 'classnames';

export default function Input({ label, textarea, className, ...rest }) {
  return (
    <label className="block text-sm mb-3">
      <span className="font-medium text-gray-700 mb-1 block">{label}</span>
      {textarea ? (
        <textarea className={clsx('w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary px-3 py-2 text-sm resize-none min-h-[90px]', className)} {...rest} />
      ) : (
        <input className={clsx('w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary px-3 py-2 text-sm', className)} {...rest} />
      )}
    </label>
  );
}
