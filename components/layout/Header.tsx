'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, Phone, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'

const navigation = [
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'Level 1 Outpatient', href: '/programs/outpatient' },
      { label: 'Level 2.1 Intensive Outpatient', href: '/programs/intensive-outpatient' },
      { label: 'Level 2.5 Partial Hospitalization', href: '/programs/partial-hospitalization' },
      { label: 'Supportive Housing Partners', href: '/programs/supportive-housing' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Approach', href: '/about/approach' },
      { label: 'Meet the Team', href: '/about/team' },
      { label: 'Testimonials', href: '/about/testimonials' },
      { label: 'Location & Hours', href: '/about/locations' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100'
          : 'bg-white border-b border-stone-100'
      )}
    >
      <div className="container mx-auto">
        <div className="flex h-20 md:h-24 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            aria-label="Walkway to Healing — Home"
          >
            <div className="relative h-16 w-16 md:h-20 md:w-20">
              <Image
                src="/logo.png"
                alt="Walkway to Healing logo"
                fill
                className="object-contain"
                priority
                sizes="80px"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-primary text-lg leading-tight">
                Walkway to Healing
              </div>
              <div className="text-xs text-stone-500 font-medium">
                Maryland
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
                      pathname.startsWith(item.href)
                        ? 'text-primary bg-primary-50'
                        : 'text-stone-700 hover:text-primary hover:bg-stone-50'
                    )}
                    aria-expanded={activeDropdown === item.href}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-150',
                        activeDropdown === item.href && 'rotate-180'
                      )}
                    />
                  </button>
                  {activeDropdown === item.href && (
                    <div className="absolute top-full left-0 pt-1 min-w-[240px]">
                      <div className="bg-white rounded-xl shadow-lg border border-stone-100 py-2 overflow-hidden">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2.5 text-sm transition-colors duration-150',
                              pathname === child.href
                                ? 'bg-primary-50 text-primary font-medium'
                                : 'text-stone-700 hover:bg-stone-50 hover:text-primary'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
                    pathname === item.href
                      ? 'text-primary bg-primary-50'
                      : 'text-stone-700 hover:text-primary hover:bg-stone-50'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href={`tel:${siteConfig.contact.phone}`} aria-label="Call Walkway to Healing">
                <Phone className="h-3.5 w-3.5" />
                {siteConfig.contact.phoneFormatted}
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link href="/intake">Start Intake</Link>
            </Button>
          </div>

          {/* Mobile: Phone + Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <Button variant="outline" size="icon" asChild className="h-10 w-10">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                aria-label={`Call us at ${siteConfig.contact.phoneFormatted}`}
              >
                <Phone className="h-4 w-4" />
              </a>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  aria-label="Open navigation menu"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm p-0">
                <SheetHeader className="p-6 pb-4 border-b border-stone-100">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="relative h-9 w-9">
                      <Image
                        src="/logo.png"
                        alt="Walkway to Healing"
                        fill
                        className="object-contain"
                        sizes="36px"
                      />
                    </div>
                    <span className="font-display text-primary text-base">
                      Walkway to Healing
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
                  {navigation.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors',
                          pathname.startsWith(item.href)
                            ? 'bg-primary-50 text-primary'
                            : 'text-stone-800 hover:bg-stone-50 hover:text-primary'
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="ml-4 mt-1 flex flex-col gap-0.5">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'flex items-center px-4 py-2.5 rounded-lg text-sm transition-colors',
                                pathname === child.href
                                  ? 'bg-primary-50 text-primary font-medium'
                                  : 'text-stone-600 hover:bg-stone-50 hover:text-primary'
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="p-6 pt-4 border-t border-stone-100 flex flex-col gap-3 mt-auto">
                  <Button size="lg" asChild className="w-full">
                    <Link href="/intake">Start Intake</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full">
                    <Link href="/verify-insurance">Verify Insurance</Link>
                  </Button>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center justify-center gap-2 text-sm text-stone-600 hover:text-primary transition-colors py-2"
                  >
                    <Phone className="h-4 w-4" />
                    {siteConfig.contact.phoneFormatted}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
