
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
           {/* ✅ Always visible */}
        
        {children}        {/* ✅ page.tsx renders here */}
               {/* ✅ Always visible */}
      </body>
    </html>
  );
}