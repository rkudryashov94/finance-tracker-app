import "./globals.css";

import Nav from "@/components/Navigation";

// Metadata for SEO
export const metadata = {
  title: "Finance Tracker App",
  description:
    "Easily track your income and expenses, and manage your finances effectively.",

  // Additional SEO metadata
  keywords: [
    "Expense tracker",
    "Budgeting",
    "Personal finance",
    "Income and expenses",
  ],
  author: "Roman Kudryashov",
};

// Viewport configuration for mobile optimization
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
