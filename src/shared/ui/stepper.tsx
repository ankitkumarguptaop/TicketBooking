import { cn } from "@/shared/lib/utils";

type Props = {
  steps: string[];
  /** Zero-based index of the current step. */
  currentStep: number;
  className?: string;
};

export function Stepper({ steps, currentStep, className }: Props) {
  return (
    <ol aria-label="Progress" className={cn("flex items-center gap-5", className)}>
      {steps.map((step, position) => {
        const isCurrent = position === currentStep;
        return (
          <li
            key={step}
            aria-current={isCurrent ? "step" : undefined}
            className={cn(
              "flex items-center gap-2 text-xs",
              isCurrent ? "font-semibold text-foreground" : "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full border text-[0.625rem] font-bold",
                isCurrent ? "border-primary bg-primary text-primary-foreground" : "border-border",
              )}
            >
              {position + 1}
            </span>
            {step}
          </li>
        );
      })}
    </ol>
  );
}
