import React from 'react';
import clsx from 'classnames';

export default function Button({ children, className, variant='primary', ...rest }) {
  const styles = {
    primary: 'bg-primary text-white hover:opacity-90',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    subtle: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  };
  return (
    <button className={clsx('px-5 py-2.5 rounded-lg font-medium text-sm transition-colors', styles[variant], className)} {...rest}>
      {children}
    </button>
  );
}
