//***************//
//* Root Layout *//
//***************//

import './globals.css';
import { Header } from '@/components/Header';
import ReduxWrapper from '@/components/ReduxWrapper';

export const metadata = {
  title: 'Book Store',
  description: 'App using Simple Book API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-gray-50 text-gray-700'>
        <ReduxWrapper>
          <Header />
          <div>
            <div className='px-5 py-5'>{children}</div>
          </div>
        </ReduxWrapper>
      </body>
    </html>
  );
}
