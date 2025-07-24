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
            <footer id="footer" className="min-w-screen bg-background border-t border-primary/20 py-12">
                <div className="flex flex-row items-center justify-evenly">

                    {/*  */}
                    <section>
                        <nav>
                            <ul className="space-y-2">
                                {primaryNavigationItems.map((item, idx) => (
                                    <li key={idx} className="text-secondary 2xl:text-md lg:text-sm transition-colors decoration-primary hover:text-primary hover:decoration-secondary">
                                        <Link href={item.href} className="underline">{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>

                    {/*  */}
                    <section className="space-y-2 px-4">
                        <Link href="/" area-label="Bizranker Buisness Directory Home">
                            <Image
                                src='/main-logo.svg'
                                alt="BizRanker - Business Directory and Ranking Platform Logo"
                                width={150}
                                height={50}
                                className="hover:opacity-80 transition-opacity"
                            />
                        </Link>
                        <h6 className="text-primary">Ranking Buisnesses</h6>
                    </section>

                    {/*  */}
                    <section>
                        <nav>
                            <ul className="space-y-2 text-right">
                                {secondaryNavigationItems.map((item, idx) => (
                                    <li key={idx} className={`2xl:text-md lg:text-sm transition-colors decoration-primary hover:text-primary hover:decoration-secondary ${item.isActive ? 'text-primary' : 'text-secondary'}`}>
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