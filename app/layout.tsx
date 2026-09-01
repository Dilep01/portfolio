import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dilep01.github.io/portfolio/'),
  title: 'Dilep Kumar K — Data Science & AI Portfolio',
  description: 'Portfolio of Dilep Kumar K, building explainable machine-learning systems for risk, fraud, and local AI.',
  openGraph: {
    title: 'Dilep Kumar K — Data Science & AI Portfolio',
    description: 'Explainable machine-learning systems for risk, fraud, and local AI.',
    url: 'https://dilep01.github.io/portfolio/',
    type: 'website',
    images: [{ url: 'https://dilep01.github.io/portfolio/og.png', width: 1200, height: 630, alt: 'Dilep Kumar K — Data Science, Machine Learning, Explainable AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dilep Kumar K — Data Science & AI Portfolio',
    description: 'Explainable machine-learning systems for risk, fraud, and local AI.',
    images: ['https://dilep01.github.io/portfolio/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
