import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar }  from '../components/layout/Navbar'
import { Footer }  from '../components/layout/Footer'
import AOS from 'aos'

export function PublicLayout() {
  const { pathname } = useLocation()

  // Scroll to top on route change + refresh AOS
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    AOS.refresh()
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
