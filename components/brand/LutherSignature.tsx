import { Pinyon_Script } from "next/font/google";
import { cn } from "@/lib/utils";

const lutherScript = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type LutherSignatureProps = React.HTMLAttributes<HTMLSpanElement>;

export function LutherSignature({
  className,
  "aria-hidden": ariaHidden,
  ...props
}: LutherSignatureProps) {
  const decorative = ariaHidden === true || ariaHidden === "true";

  return (
    <span
      className={cn(
        lutherScript.className,
        "inline-block select-none text-[2.15rem] leading-none tracking-tight text-current [-webkit-text-stroke:0.5px_currentColor] [paint-order:stroke_fill]",
        className
      )}
      aria-label={decorative ? undefined : "Luther"}
      role={decorative ? undefined : "img"}
      aria-hidden={ariaHidden}
      {...props}
    >
      Luther
    </span>
  );
}
