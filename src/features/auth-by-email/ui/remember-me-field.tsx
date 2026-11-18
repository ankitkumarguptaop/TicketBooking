"use client";

import { Controller, type Control } from "react-hook-form";

import { Checkbox } from "@/shared/ui/checkbox";
import { Field, FieldLabel } from "@/shared/ui/field";

import type { LoginValues } from "../model/login-schema";

type Props = {
  control: Control<LoginValues>;
};

export function RememberMeField({ control }: Props) {
  return (
    <Controller
      control={control}
      name="rememberMe"
      render={({ field }) => (
        <Field orientation="horizontal" className="w-auto gap-2">
          <Checkbox
            id="field-rememberMe"
            name={field.name}
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked === true)}
          />
          <FieldLabel htmlFor="field-rememberMe" className="text-xs font-normal text-muted-foreground">
            Keep me signed in
          </FieldLabel>
        </Field>
      )}
    />
  );
}
