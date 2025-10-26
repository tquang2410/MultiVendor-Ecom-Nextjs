"use client";
import { Poppins} from 'next/font/google';
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {NavbarSidebar} from "@/app/(home)/navbar-sidebar";
import {useState} from "react";
import {MenuIcon} from "lucide-react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});
interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}
const NavbarItem = ({href, children, isActive}: NavbarItemProps) => {
    return (
        <Button
            asChild
            variant="outline"
                className={cn("bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
                    isActive && "bg-black text-white hover:bg-black hover:text-white",
                    )}
        >
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
}
const navbarItems = [
    {href: "/", children: "Home"},
    {href: "/about", children: "About"},
    {href: "/contact", children: "Contact"},
    {href: "/pricing", children: "Pricing"},
    {href: "/features", children: "Features"},
];

export const Navbar = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <nav className="h-20 flex border-b justify-between font-medium bg-white">
            <Link href="/" className="pl-6 flex items-center">
                <span className={cn("text-5xl font-semibold", poppins.className)}>
                    Funroad
                </span>
            </Link>
            <NavbarSidebar items={navbarItems} open={isSidebarOpen} onOpenChange={setIsSidebarOpen}></NavbarSidebar>
            <div className="items-center gap-4 hidden lg:flex">
                {navbarItems.map((item) => (
                    <NavbarItem
                        key={item.href}
                        href={item.href}
                        isActive={pathname === item.href}
                    >
                        {item.children}
                    </NavbarItem>
                ))}
            </div>
            <div className="hidden lg:flex">
                <Button variant="secondary"
                        asChild
                        className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white text-black hover:bg-zinc-100 hover:text-black hover:shadow-lg hover:shadow-zinc-400/50 hover:border-l-zinc-300 transition-all duration-300 ease-in-out text-lg"
                >
                    <Link href="/sign-in">
                        login
                    </Link>
                </Button>
                <Button
                    asChild
                    className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-zinc-900 hover:text-white hover:shadow-lg hover:shadow-zinc-700/50 transition-all duration-300 ease-in-out text-lg"
                >
                    <Link href="/sign-up">
                        Star selling
                    </Link>
                </Button>
            </div>
            <div className="flex lg:hidden items-center justify-center">
                <Button
                    variant="ghost"
                    className="size-12 border-transparent bg-white"
                    onClick={() => setIsSidebarOpen(true)}
                >

                    <MenuIcon/>
                </Button>
            </div>
        </nav>
    )
}