import React from 'react';
import { cn } from '../../utils/cn';

const badgeVariants = (variant = 'default') => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md border px-2 py-0.5 w-fit whitespace-nowrap shrink-0 transition-colors';

  const variantClasses = {
    default: 'border-transparent bg-primary text-primary-foreground',
    secondary: 'border-transparent bg-secondary text-secondary-foreground',
    destructive: 'border-transparent bg-red-600 text-white',
    outline: 'text-foreground',
  };

  return `${baseClasses} ${variantClasses[variant]}`;
};

function Badge({ className = '', variant = 'default', ...props }) {
  return <span className={cn(badgeVariants(variant), className)} {...props} />;
}


export default Badge;
export { badgeVariants };