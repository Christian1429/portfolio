import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SanityLive } from '@/sanity/lib/live';
import '../globals.css';
import { draftMode } from 'next/headers';
import Script from 'next/script';
import { VisualEditing } from 'next-sanity/visual-editing';
import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '@/components/DarkModeToggle';
import { DisableDraftMode } from '@/components/DisableDraftMode';
import { FloatingDock } from '@/components/FloatingDock';
import SidebarToggle from '@/components/SidebarToggle';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio Christian Lindberg',
  description: 'Fullstack Developer Christian Lindberg',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Script
              src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
              strategy="afterInteractive"
            />

            <SidebarProvider defaultOpen={false}>
              <SidebarInset className="">{children}</SidebarInset>

              <AppSidebar side="right" />

              <FloatingDock />
              <SidebarToggle />

              {/* Mode Toggle - Desktop: bottom right next to AI chat, Mobile: top right next to burger menu */}
              <div className="fixed md:bottom-6 md:right-24 top-4 right-18 md:top-auto md:left-auto z-0">
                <div className="w-10 h-10 md:w-12 md:h-12">
                  <ModeToggle />
                </div>
              </div>
            </SidebarProvider>

            {/* Live content API */}
            <SanityLive />

            {(await draftMode()).isEnabled && (
              <>
                <VisualEditing />
                <DisableDraftMode />
              </>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}