/**
 * Resume download URL.
 * Set NEXT_PUBLIC_RESUME_URL in .env.local to use a remote link (e.g. Google Drive).
 * Falls back to /resume.pdf served from /public when the env var is absent.
 */
export const RESUME_URL =
  process.env.NEXT_PUBLIC_RESUME_URL?.trim() || "/resume.pdf";
