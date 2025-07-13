import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';

type SeparatorProps = React.ComponentPropsWithoutRef<
  typeof SeparatorPrimitive.Root
> & {
  color?: string;
  thickness?: number | string;
};

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      color = 'rgba(156, 163, 175, 0.5)',
      thickness = 1,
      ...props
    },
    ref
  ) => {
    const style =
      orientation === 'horizontal'
        ? { height: thickness, backgroundColor: color }
        : { width: thickness, backgroundColor: color };

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 transition-colors duration-300',
          orientation === 'horizontal' ? 'w-full' : 'h-full',
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
