import NavBar from "@/components/NavBar";
import { Providers } from "@/components/Providers";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={`antialiased`}>
          <Providers>
            <div className="min-h-screen bg-gray-50">
              <NavBar />
              <main className="container mx-auto px-4 py-8">{children}</main>
            </div>
          </Providers>
        </body>
      </html>
  );
}
