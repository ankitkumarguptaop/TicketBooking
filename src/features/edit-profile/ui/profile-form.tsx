"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { type User, VerifiedBadge } from "@/entities/user";
import { getErrorMessage } from "@/shared/api/get-error-message";
import { Button } from "@/shared/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { TextFormField } from "@/shared/ui/text-form-field";

import { useUpdateProfileMutation } from "../api/update-profile-api";
import { normalisePhone, profileSchema, type ProfileValues } from "../model/profile-schema";

type Props = {
  user: User;
};

export function ProfileForm({ user }: Props) {
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: user.fullName, phone: user.phone },
  });
  const { isDirty } = form.formState;

  async function handleSubmit({ fullName, phone }: ProfileValues) {
    const result = await updateProfile({ fullName, phone: normalisePhone(phone) });
    if ("data" in result && result.data) {
      // The saved values become the new baseline, so Discard returns to them.
      form.reset({ fullName: result.data.fullName, phone: result.data.phone });
      // A new number starts unverified. Optional: the sidebar's "Verify" opens a code dialog.
      toast.success(
        result.data.phoneVerified || !user.phoneVerified
          ? "Profile updated"
          : "Profile updated. Your new number isn't verified yet",
      );
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
        <TextFormField control={form.control} name="fullName" label="Full name" autoComplete="name" />
        <TextFormField
          control={form.control}
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          description="Verifying it is optional. A new number starts unverified."
        />
        {/* The API doesn't let users change their email, so it's shown read-only. */}
        <Field>
          <FieldLabel htmlFor="field-email" className="text-xs">
            Email <VerifiedBadge verified={user.emailVerified} />
          </FieldLabel>
          <Input id="field-email" type="email" value={user.email} readOnly aria-describedby="field-email-description" />
          <FieldDescription id="field-email-description" className="text-xs">
            Your email can&apos;t be changed.
          </FieldDescription>
        </Field>
      </div>
      {error && <FieldError>{getErrorMessage(error)}</FieldError>}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" size="lg" disabled={!isDirty || isLoading} onClick={() => form.reset()}>
          Discard
        </Button>
        <Button type="submit" size="lg" disabled={!isDirty || isLoading}>
          {isLoading ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
