import { env } from "@/shared/config/env";
import { Button } from "@/shared/ui/button";

export function GoogleSignInButton() {
  return (
    <Button asChild variant="outline" size="lg" className="w-full">
      {/* A full-page navigation, because the Google OAuth flow redirects through the API. */}
      <a href={`${env.apiUrl}/auth/google`}>Continue with Google</a>
    </Button>
  );
}
