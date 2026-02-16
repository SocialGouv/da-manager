import { NextRequest } from "next/server";

/**
 * Build a NextRequest suitable for calling Next.js App Router route handlers.
 */
export function makeRequest(
  url: string,
  options: {
    method?: string;
    body?: unknown;
    searchParams?: Record<string, string>;
  } = {},
): NextRequest {
  const fullUrl = new URL(url, "http://localhost:3000");

  if (options.searchParams) {
    for (const [key, value] of Object.entries(options.searchParams)) {
      fullUrl.searchParams.set(key, value);
    }
  }

  const init: RequestInit = {
    method: options.method ?? "GET",
  };

  if (options.body !== undefined) {
    init.body = JSON.stringify(options.body);
    init.headers = { "Content-Type": "application/json" };
  }

  return new NextRequest(fullUrl, init);
}

/**
 * Helper to build the params argument for dynamic route handlers.
 * Next.js 16 route params are always Promise-wrapped.
 */
export function makeParams<T extends Record<string, string>>(params: T) {
  return { params: Promise.resolve(params) };
}
