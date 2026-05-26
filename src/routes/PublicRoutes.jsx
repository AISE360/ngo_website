import { Outlet } from 'react-router-dom'
import { Navbar }  from '../components/layout/Navbar'
import { Footer }  from '../components/layout/Footer'

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* pt-[72px] clears the fixed 72px navbar for all pages */}
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
