import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "grid h-full w-full shrink-0 place-items-center overflow-hidden px-4 sm:px-6",
        className
      )}
    >
      {children}
    </section>
  );
}
