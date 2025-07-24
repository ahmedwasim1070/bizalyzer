"use client";

// Imports
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// 
function Footer() {
    const pathname = usePathname();
    const primaryNavigationItems = [
        {
            href: '/about-us',
            label: 'About us',
        },
        {
            href: '/terms-of-usage',
            label: 'Terms Of Usage',
        },
        {
            href: '/privacy-policy',
            label: 'Privacy Policy',
        }
    ]
    const secondaryNavigationItems = [
        {
            href: '/top/world/profiles',
            label: 'Top World Profiles',
            isActive: pathname === '/top/world/profiles',
        },
        {
            href: '/top/country/profiles',
            label: 'Top Country Profiles',
            isActive: pathname === '/top/country/profiles',
        }
    ]

    return (
        <>
            <footer id="footer" className="min-w-screen bg-background border-t border-primary/20 py-8">
                <div className="flex flex-row items-center justify-evenly">

                    {/*  */}
                    <section>
                        <nav>
                            <ul className="space-y-2">
                                {primaryNavigationItems.map((item, idx) => (
                                    <li key={idx} className="text-secondary text-sm transition-colors decoration-primary hover:text-primary hover:decoration-secondary">
                                        <Link href={item.href} className="underline">{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>

                    {/*  */}
                    <section className="space-y-2 px-4">
                        <Image src='/main-logo.svg' width={150} height={50} alt="Bizraker - Buisness Directory and Ranking Platform logo" />
                        <h6 className="text-primary">Ranking Buisnesses</h6>
                    </section>

                    {/*  */}
                    <section>
                        <nav>
                            <ul className="space-y-2 text-right">
                                {secondaryNavigationItems.map((item, idx) => (
                                    <li key={idx} className={`text-sm transition-colors decoration-primary hover:text-primary hover:decoration-secondary ${item.isActive ? 'text-primary' : 'text-secondary'}`}>
                                        <Link href={item.href} className="underline">{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>

                </div>
            </footer>
        </>
    )

}

export default Footer;