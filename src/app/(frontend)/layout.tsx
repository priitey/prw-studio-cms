import React from 'react'
import './styles.css'

export const metadata = {
  description: 'The CMS app for the website of prw.studio. Design, Coding and Multimedia projects are categorised, uploaded and edited via this app.',
  title: 'prw.studio CMS',
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
