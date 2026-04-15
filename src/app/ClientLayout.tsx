"use client"

import React from 'react'
import Header from '../ui/Header/Header'
import SiteOverview from '../ui/SiteOverview/SiteOverview'
import Footer from '../ui/Footer/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex">
        <SiteOverview />
        <main className="flex fd-column overflow-hidden m-auto w-100">
          {children}
          <Footer />
        </main>
      </main>
    </>
  )
}
