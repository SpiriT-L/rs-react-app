import './App.css';
import './assets/fonts/fonts.css';
import ClientProvider from './components/ClientProvider';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { metadata } from './components/Metadata/metadata';
import { ThemeProvider } from './context/ThemeContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <ClientProvider>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
