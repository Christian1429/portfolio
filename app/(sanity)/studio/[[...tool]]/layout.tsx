import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Studio',
  description: 'Manage Sanity Studio',
};

function Layout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="en">
        <body>
            {children}
        </body>
    </html>
  )
}

export default Layout