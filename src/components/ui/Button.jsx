import React from 'react'
import {cn} from '../../utils/cn'


const buttonVariants = (variant = 'default', size = 'default') => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'hover:bg-gray-100 text-gray-700',
    link: 'text-blue-600 underline-offset-4 hover:underline',
  };

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
};

function Button({className='', variant='default', size='default', asChild = false, ...props}) {
  return (
    <button className={cn(buttonVariants(variant, size), className)} {...props}/>
  )
}

export default Button;
export {buttonVariants};