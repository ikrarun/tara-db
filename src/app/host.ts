export const host =
  process.env.NODE_ENV === "production"
    ? "https://taradb.vercel.app"
    : "http://localhost:3000";
