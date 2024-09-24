import "./globals.css";

import Nav from "@/components/Navigation";

export const metadata = {
  title: "Finance Tracker App",
  description: "Easily track your income and expenses, and manage your finances effectively.",

  // Viewport for mobile optimization
  viewport: "width=device-width, initial-scale=1.0",

  // Additional SEO metadata
  keywords: ["Expense tracker", "Budgeting", "Personal finance", "Income and expenses"],
  author: "Roman Kudryashov",
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
