// src/app/layout.tsx (서버 컴포넌트)

export const metadata = {
  title: 'healax',
  description: 'welcome healax',
}

import RootLayout from './client-root-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
