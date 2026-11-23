/** Error body sent by the API: `{ statusCode, code?, message }`. */
type ApiErrorBody = {
  code?: string;
  message?: string | string[];
};

const fallbackMessage = "Something went wrong. Please try again.";

function bodyOf(error: unknown): ApiErrorBody | undefined {
  if (typeof error !== "object" || error === null || !("data" in error)) return undefined;
  const data = error.data;
  return typeof data === "object" && data !== null ? (data as ApiErrorBody) : undefined;
}

/** Machine-readable code from the API, e.g. "IDENTITY_EMAIL_ALREADY_REGISTERED". */
export function getErrorCode(error: unknown): string | undefined {
  return bodyOf(error)?.code;
}

export function getErrorMessage(error: unknown): string {
  if (typeof error !== "object" || error === null || !("status" in error)) {
    return fallbackMessage;
  }

  if (error.status === "FETCH_ERROR") {
    return "Can't reach the server. Check your connection and try again.";
  }

  const message = bodyOf(error)?.message;

  if (Array.isArray(message)) {
    return message[0] ?? fallbackMessage;
  }

  return message ?? fallbackMessage;
}
