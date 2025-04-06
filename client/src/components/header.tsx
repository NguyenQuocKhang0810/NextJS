"use client";

import Link from "next/link";
import { ThemeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgePlus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/app/app-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();
  const router = useRouter();
  const { sessionToken } = useAppContext();
  // console.log("sessionToken", sessionToken);

  const navItems = [
    {
      name: "Home",
      href: "/",
      dropdown: [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Profile", href: "/profile" },
      ],
    },
    {
      name: "About",
      href: "/about",
      dropdown: [
        { name: "Our Team", href: "/about/team" },
        { name: "Mission", href: "/about/mission" },
      ],
    },
    {
      name: "Contact",
      href: "/contact",
      dropdown: [
        { name: "Support", href: "/contact/support" },
        { name: "Feedback", href: "/contact/feedback" },
      ],
    },
    {
      name: "Store",
      href: "/products",
      dropdown: [
        { name: "Best Sellers", href: "/products/best-sellers" },
        { name: "Brands", href: "/products/brands" },
      ],
    },
  ];

  const handleMouseEnter = (itemName: string) => {
    setOpenItems((prev) => ({ ...prev, [itemName]: true }));
  };

  const handleMouseLeave = (itemName: string) => {
    setOpenItems((prev) => ({ ...prev, [itemName]: false }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, itemName: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpenItems((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
    } else if (e.key === "Escape" && openItems[itemName]) {
      setOpenItems((prev) => ({ ...prev, [itemName]: false }));
    }
  };

  const handleNewProductClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!sessionToken) {
      await router.push("/login");
      router.refresh();
    } else {
      router.push("/products/new");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm shadow-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-primary-foreground font-bold text-xl">
                S
              </span>
            </div>
            <Link
              href="/"
              className="text-2xl font-bold text-foreground transition-colors duration-200 hover:text-blue-400"
            >
              SellSphere
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <div
                  key={item.name}
                  className="relative custom-padding group"
                  role="menu"
                  tabIndex={0}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={() => handleMouseLeave(item.name)}
                  onKeyDown={(e) => handleKeyDown(e, item.name)}
                  aria-label={`${item.name} menu`}
                >
                  <DropdownMenu open={openItems[item.name]} modal={false}>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          className={cn(
                            "text-foreground font-medium transition-colors duration-200",
                            "hover:text-blue-400", // Changed from text-primary
                            isActive && "text-blue-400 font-semibold" // Changed from text-primary
                          )}
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={openItems[item.name] || false}
                          aria-haspopup="true"
                          aria-label={`${item.name} dropdown menu`}
                          className="ml-1 flex items-center focus:outline-none focus:ring-2 focus:ring-ring rounded p-1"
                          onClick={() =>
                            setOpenItems((prev) => ({
                              ...prev,
                              [item.name]: !prev[item.name],
                            }))
                          }
                          onKeyDown={(e) => handleKeyDown(e, item.name)}
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200 text-muted-foreground",
                              "group-hover:text-blue-400", // Changed from text-primary
                              openItems[item.name] ? "rotate-180" : "rotate-0",
                              isActive && "text-blue-400" // Changed from text-primary
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 bg-card text-card-foreground shadow-lg rounded-md p-1 transition-all duration-300 ease-in-out border border-border nav-dropdown"
                      sideOffset={8}
                    >
                      {item.dropdown.map((subItem) => {
                        const isSubItemActive = pathname === subItem.href;
                        return (
                          <DropdownMenuItem key={subItem.name} asChild>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "block px-4 py-2 transition-colors duration-150 rounded-sm",
                                "hover:bg-accent hover:text-accent-foreground",
                                isSubItemActive &&
                                  "bg-accent text-accent-foreground"
                              )}
                            >
                              {subItem.name}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center space-x-6">
            {!sessionToken ? (
              <>
                <Link href="/login">
                  <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                      Login
                    </span>
                  </button>
                </Link>
                <Link href="/register">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <Link
                href="/me"
                className="hover:scale-110 transition-transform duration-200 ease-in-out"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
              </Link>
            )}
            {sessionToken && (
              <Link href="/logout">
                <button className="group flex items-center justify-start w-[32px] h-[32px] border-none rounded-full cursor-pointer relative overflow-hidden transition-all duration-400 delay-200 shadow-[2px_2px_10px_rgba(0,0,0,0.2)] bg-gradient-to-r from-[#3498db] to-[#e74c3c] hover:w-[150px] hover:rounded-[20px] hover:bg-gradient-to-r hover:from-[#3498db] hover:to-[#e74c3c] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                  <div className="sign w-full transition-all duration-400 delay-200 flex items-center justify-center group-hover:w-[30%] group-hover:pl-3">
                    <svg viewBox="0 0 512 512" className="w-[17px]">
                      <path
                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                        className="fill-white"
                      ></path>
                    </svg>
                  </div>
                  <div className="text absolute right-0 w-0 opacity-0 text-[#ecf0f1] text-base font-semibold transition-all duration-400 delay-200 group-hover:opacity-100 group-hover:w-[70%] group-hover:pr-2.5">
                    Logout
                  </div>
                </button>
              </Link>
            )}
            <ThemeToggle />
            <button
              onClick={handleNewProductClick}
              className="flex justify-center items-center bg-blue-400 text-primary-foreground px-4 py-2 rounded-md hover:bg-blue-400/90 transition-all duration-200 hover:scale-105"
            >
              <BadgePlus className="mr-2" />
              New Product
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
