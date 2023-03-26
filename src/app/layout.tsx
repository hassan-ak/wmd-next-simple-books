import { Header } from '@/components/Header';
import './globals.css';

export const metadata = {
  title: 'Simple Books',
  description: 'App created using Next.JS to consume simple books API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-gray-50 text-gray-700'>
        <Header />
        <div>
          <div className='px-5 py-5'>{children}</div>
        </div>
      </body>
    </html>
  );
}
