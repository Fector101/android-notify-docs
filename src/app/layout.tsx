import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from "sonner"
import { VersionProvider } from '../context/VersionContext'
import ClientLayout from './ClientLayout'

import '../assets/css/quick-styles.css'
import '../assets/css/app.css'

export const metadata: Metadata = {
  title: 'Android Notify Docs - Python Notification Library for Android',
  description: 'Official documentation for Android Notify, a powerful Python library for creating rich Android notifications in Kivy and Python-for-Android applications.',
  keywords: 'android, notifications, python, kivy, python-for-android, mobile development',
  authors: [{ name: 'Fector101' }],
  openGraph: {
    type: 'website',
    url: 'https://github.com/Fector101/android_notify/',
    title: 'Android Notify - Python Notification Library for Android',
    description: 'Create rich Android notifications with Python. Simple API for progress bars, buttons, images, and more in your Kivy applications.',
    images: ['https://android-notify.vercel.app/meta.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Android Notify - Python Notification Library for Android',
    description: 'Create rich Android notifications with Python. Simple API for progress bars, buttons, images, and more in your Kivy applications.',
    images: ['https://android-notify.vercel.app/meta.jpg'],
  },
  applicationName: 'Android Notify'
}

export const viewport = {
  themeColor: '#3F51B5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/img.svg" />
      </head>
      <body>
        <VersionProvider>
          <div id="root">
            <Toaster position="top-right" />
            <ClientLayout>
              {children}
            </ClientLayout>
          </div>
        </VersionProvider>
        <Analytics />
      </body>
    </html>
  )
}
