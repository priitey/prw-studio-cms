import React from 'react'
import './styles.css'

export const metadata = {
  description: 'The CMS app for the website of prw.studio. Design, Coding and Multimedia projects are categorised, uploaded and edited via this app.',
  title: 'prw.studio CMS',
  keywords: ['CMS', 'prw.studio', 'design', 'multimedia'],
  authors: [{ name: 'Pritey', url: 'https://prw.studio' }],
  creator: 'Pritey',
  publisher: 'prw.studio',
  themeColor: '#c7c7c7',
  locale: 'en_US',
  type: 'website'
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}