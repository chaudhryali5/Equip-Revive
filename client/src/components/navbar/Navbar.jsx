import React, { useState, useEffect } from 'react'
import { assets } from '@/assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (e) {
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }, [location])

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'US'
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <img src={assets.logo1} alt="EquipRevive Logo" className="h-30 md:h-30 w-auto" />
            </NavLink>
          </div>

          {/* Desktop Navigation - Hidden on small screens */}
          <div className="hidden lg:flex items-center gap-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors hover:text-primary relative ${isActive ? 'text-primary after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary' : 'text-muted-foreground'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors hover:text-primary relative ${isActive ? 'text-primary after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary' : 'text-muted-foreground'
                }`
              }
            >
              Services
            </NavLink>
             <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors hover:text-primary relative ${isActive ? 'text-primary after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary' : 'text-muted-foreground'
                }`
              }
            >
              Bookings
            </NavLink>
            <NavLink
              to="/aboutus"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors hover:text-primary relative ${isActive ? 'text-primary after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary' : 'text-muted-foreground'
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors hover:text-primary relative ${isActive ? 'text-primary after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary' : 'text-muted-foreground'
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* User Profile or Sign Up - Desktop */}
            <div className="hidden sm:flex">
              {user ? (
                <NavLink to="/profile" title="View Profile">
                  <Avatar className="h-10 w-10 border border-muted cursor-pointer hover:shadow-md transition-shadow">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </NavLink>
              ) : (
                <Button size="sm" asChild className="hidden sm:inline-flex font-semibold shadow-sm hover:shadow-md transition-shadow">
                  <NavLink to="/login">Sign Up</NavLink>
                </Button>
              )}
            </div>

            {/* Mobile Menu - Visible only on small screens */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <FiMenu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 mt-6">
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col gap-2 px-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Navigation</p>
                    <NavLink
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `text-base font-medium transition-all hover:text-primary hover:translate-x-1 py-3 px-3 rounded-md ${isActive ? 'text-primary bg-primary/10' : 'text-foreground'
                        }`
                      }
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/services"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `text-base font-medium transition-all hover:text-primary hover:translate-x-1 py-3 px-3 rounded-md ${isActive ? 'text-primary bg-primary/10' : 'text-foreground'
                        }`
                      }
                    >
                      Services
                    </NavLink>
                    <NavLink
                      to="/aboutus"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `text-base font-medium transition-all hover:text-primary hover:translate-x-1 py-3 px-3 rounded-md ${isActive ? 'text-primary bg-primary/10' : 'text-foreground'
                        }`
                      }
                    >
                      About Us
                    </NavLink>
                    <NavLink
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `text-base font-medium transition-all hover:text-primary hover:translate-x-1 py-3 px-3 rounded-md ${isActive ? 'text-primary bg-primary/10' : 'text-foreground'
                        }`
                      }
                    >
                      Contact
                    </NavLink>

                    {/* Mobile Profile Link if logged in */}
                    {user && (
                      <NavLink
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-base font-medium transition-all hover:text-primary hover:translate-x-1 py-3 px-3 rounded-md ${isActive ? 'text-primary bg-primary/10' : 'text-foreground'}`
                        }
                      >
                        <span>My Profile</span>
                      </NavLink>
                    )}
                  </div>

                  {/* Mobile Auth Buttons */}
                  {!user && (
                    <div className="sm:hidden px-1 mt-auto pb-4 flex flex-col gap-2">
                      <Button size="sm" asChild className="w-full font-semibold">
                        <NavLink to="/login" onClick={() => setIsOpen(false)}>Sign Up</NavLink>
                      </Button>
                    </div>
                  )}
                  {user && (
                    <div className="sm:hidden px-1 mt-auto pb-4 flex flex-col gap-2">
                      <div className="flex items-center gap-3 px-2 py-2 mb-2 bg-muted/30 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">{user.name}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[150px]">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar