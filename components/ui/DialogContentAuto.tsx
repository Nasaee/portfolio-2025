'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/utils/utils';

export const DialogContentAuto = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    {/* Overlay อยู่ z-50 */}
    <DialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-[50] bg-black/40',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
      )}
    />
    {/* Content ยกเป็น z-[60] ให้ชนะ overlay เสมอ */}
    <DialogPrimitive.Content
      ref={ref}
      {...props}
      className={cn(
        'fixed left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%]',
        'grid gap-4 border bg-background p-6 shadow-lg duration-200',
        'w-auto max-w-[90vw] max-h-[90dvh] overflow-auto rounded-2xl',
        className
      )}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContentAuto.displayName = 'DialogContentAuto';
