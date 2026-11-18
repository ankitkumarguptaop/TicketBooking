import type { User } from "@/entities/user";
import { baseApi } from "@/shared/api/base-api";

import type { LoginValues } from "../model/login-schema";
import type { RegisterValues } from "../model/register-schema";

type AuthResponse = {
  user: User;
};

type RegisterRequest = Omit<RegisterValues, "confirmPassword">;

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginValues>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
    register: build.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
