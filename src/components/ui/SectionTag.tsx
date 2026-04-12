type SectionTagProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionTag({ children, className = "" }: SectionTagProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-purple-500" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
        {children}
      </span>
    </div>
  );
}
