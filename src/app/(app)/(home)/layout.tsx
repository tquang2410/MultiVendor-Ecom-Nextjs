import { Footer } from './footer'
import { Navbar } from './navbar'

/**
 * Đây là Server Component (RSC) Layout.
 */
export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container flex-1 py-8">{children}</main>
      <Footer />
    </div>
  )
}