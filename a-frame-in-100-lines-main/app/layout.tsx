import { SpeedInsights } from "@vercel/speed-insights/next"
export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <SpeedInsights />
    </html>
  );
}
