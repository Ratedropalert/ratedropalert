export {};

declare global {
  interface Window {
    fbq?: (
      method: "track" | "init",
      event: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}
