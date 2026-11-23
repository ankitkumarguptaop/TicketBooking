import type { User } from "@/entities/user";
import { baseApi } from "@/shared/api/base-api";

import type { LoginValues } from "../model/login-schema";
import type { RegisterValues } from "../model/register-schema";

/** The tokens arrive as httpOnly cookies; the body only carries display data. */
type LoginResponse = {
  user: User;
  /** ISO date. */
  accessTokenExpiresAt: string;
};

type LoginRequest = Pick<LoginValues, "email" | "password">;

type RegisterRequest = Omit<RegisterValues, "confirmPassword">;

type RegisterResponse = {
  userId: string;
};

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      // Send only what the API accepts: it rejects unknown fields (e.g. rememberMe).
      query: ({ email, password }) => ({ url: "/auth/login", method: "POST", body: { email, password } }),
      invalidatesTags: ["User", "LoginSession"],
    }),
    // Creates the account only. No cookies, no session: the user signs in
    // separately afterwards, which also proves they remember the password.
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
