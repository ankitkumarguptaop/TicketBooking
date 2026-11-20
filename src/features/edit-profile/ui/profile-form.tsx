"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { UserProfile } from "@/entities/user";
import { getErrorMessage } from "@/shared/api/get-error-message";
import { Button } from "@/shared/ui/button";
import { FieldError } from "@/shared/ui/field";
import { TextFormField } from "@/shared/ui/text-form-field";

import { useUpdateProfileMutation } from "../api/update-profile-api";
import { profileSchema, type ProfileValues } from "../model/profile-schema";

type Props = {
  profile: UserProfile;
};

export function ProfileForm({ profile }: Props) {
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: profile.name, email: profile.email, phone: profile.phone, city: profile.city },
  });
  const { isDirty } = form.formState;

  async function handleSubmit(values: ProfileValues) {
    const result = await updateProfile({ current: profile, values });
    if ("data" in result && result.data) {
      // The saved values become the new baseline, so Discard returns to them.
      form.reset(values);
      toast.success("Profile updated");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
        <TextFormField control={form.control} name="name" label="Full name" autoComplete="name" />
        <TextFormField control={form.control} name="email" label="Email" type="email" autoComplete="email" />
        <TextFormField control={form.control} name="phone" label="Phone" type="tel" autoComplete="tel" />
        <TextFormField control={form.control} name="city" label="City" autoComplete="address-level2" />
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
