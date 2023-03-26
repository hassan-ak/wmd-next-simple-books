import './globals.css'

export const metadata = {
  title: 'Simple Books',
  description: 'App created using Next.JS to consume simple books API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
