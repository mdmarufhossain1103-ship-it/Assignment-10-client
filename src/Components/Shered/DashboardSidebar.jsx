'use client'
import { authClient } from "@/lib/auth-client";
import { Bars, ChartColumn, ChartPie, ClockArrowRotateLeft, FileDollar, LayoutCells, PencilToSquare, Person, PersonFill, Picture, Plus, Star } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export  function DashboardSidebar() {
    const pathname = usePathname();

   const {data: session} = authClient.useSession();
    const user = session?.user;
    
    
    const getNavLinkClass = (path) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${pathname === path
            ? 'text-blue-600 font-semibold bg-blue-50'
            : 'text-foreground hover:bg-default'
        }`;

    const dashboardItems = {
        user: [
            { icon: ClockArrowRotateLeft, label: "Purchase History", link: "/dashboard/user" },
            { icon: Picture, label: "Bought Artworks", link: "/dashboard/user/bought-artworks" },
            { icon: Person, label: "Profile Management", link: "/dashboard/user/profile-management" },
            { icon: FileDollar, label: "Subscription", link: "/dashboard/user/subscription" },
        ],
        artist: [
            { icon: LayoutCells, label: "Manage Artwork", link: "/dashboard/artist" },
            { icon: Plus, label: "Add Artwork", link: "/dashboard/artist/add-artwork" },
            { icon: PencilToSquare, label: "Edit Artwork", link: "/dashboard/artist/edit-artwork" },
            { icon: ChartColumn, label: "Sales History", link: "/dashboard/artist/sales-history" },
            { icon: Person, label: "Profile Management", link: "/dashboard/artist/profile-management" },
        ],
        admin: [
            { icon: PersonFill, label: "Management Users", link: "/dashboard/admin" },
            { icon: Picture, label: "Manage All Artworks", link: "/dashboard/admin/manage-all-artworks" },
            { icon: ChartColumn, label: "View All Transactions", link: "/dashboard/admin/view-all-transactions" },
            { icon: ChartPie, label: "Analytics Overview", link: "/dashboard/admin/analytics-overview" },
            { icon: ChartColumn, label: "Charts", link: "/dashboard/admin/charts" },
        ]
    };

    const userRole = user?.role;
    const navItems = (userRole && dashboardItems[userRole]) ? dashboardItems[userRole] : [];

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    className={getNavLinkClass(item.link)}
                    href={item.link}
                >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );

    return (
        <>
            <aside className='hidden w-64 shrink-0 border-r border-default p-4 lg:block'>
                {navContent}
            </aside>
            <Drawer>
                <Button className='lg:hidden' variant="secondary">
                    <Bars />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body className="p-4">
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}