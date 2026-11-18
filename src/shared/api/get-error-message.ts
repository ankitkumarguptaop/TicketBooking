type ApiErrorBody = {
  message?: string | string[];
};

const fallbackMessage = "Something went wrong. Please try again.";

export function getErrorMessage(error: unknown): string {
  if (typeof error !== "object" || error === null || !("status" in error)) {
    return fallbackMessage;
  }

  if (error.status === "FETCH_ERROR") {
    return "Can't reach the server. Check your connection and try again.";
  }

  const body = "data" in error ? (error.data as ApiErrorBody | undefined) : undefined;
  const message = body?.message;

  if (Array.isArray(message)) {
    return message[0] ?? fallbackMessage;
  }

  return message ?? fallbackMessage;
}
