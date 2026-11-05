interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Container({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={`laptop-container mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-10 ${className}`}
    >
      {children}
    </Component>
  );
}
