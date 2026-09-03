import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://lap-tite-coursiere.vercel.app'),
  title: "La P'Tite Coursière | Aide ménagère à Yaoundé",
  description: "Ménage, lessive, repassage, repas, courses et assistance à domicile à Yaoundé. Contactez La P'Tite Coursière sur WhatsApp.",
  icons: {
    icon: [
      { url: '/images/favicon.ico' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
  manifest: '/images/site.webmanifest',
  alternates: { canonical: '/' },
  openGraph: { title: "La P'Tite Coursière | Aide ménagère à Yaoundé", description: "Un service de confiance pour votre ménage et votre quotidien à Yaoundé.", type: 'website', locale: 'fr_CM' },
  twitter: { card: 'summary_large_image', title: "La P'Tite Coursière | Aide ménagère à Yaoundé", description: 'Ménage et aide à domicile à Yaoundé.' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
