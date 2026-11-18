"use client";

import type { ComponentProps } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";

type Props<TValues extends FieldValues> = {
  control: Control<TValues>;
  name: Path<TValues>;
  label: string;
  description?: string;
} & Pick<ComponentProps<"input">, "type" | "autoComplete" | "inputMode" | "placeholder">;

export function TextFormField<TValues extends FieldValues>({
  control,
  name,
  label,
  description,
  ...inputProps
}: Props<TValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const inputId = `field-${name}`;
        const descriptionId = description ? `${inputId}-description` : undefined;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={inputId} className="text-xs">
              {label}
            </FieldLabel>
            <Input
              {...field}
              {...inputProps}
              id={inputId}
              aria-invalid={fieldState.invalid}
              aria-describedby={descriptionId}
            />
            {description && <FieldDescription id={descriptionId} className="text-xs">
                {description}
              </FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
