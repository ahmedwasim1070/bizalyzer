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
            <footer id="footer" className="min-w-screen bg-background border-t border-primary/20 py-14">
                <div className="flex md:flex-row xxs:flex-col md:gap-y-0 xxs:gap-y-14 items-center justify-around">

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
                    <section className="space-y-2 flex flex-col items-center">
                        <Link href="/" area-label="Bizranker Buisness Directory Home">
                            <Image
                                src='/main-logo.svg'
                                alt="BizRanker - Business Directory and Ranking Platform Logo"
                                width={170}
                                height={70}
                                className="hover:opacity-80 transition-opacity"
                            />
                        </Link>
                        <h6 className="text-primary text-lg ">Ranking Buisnesses</h6>
                    </section>

                    {/*  */}
                    <section>
                        <nav>
                            <ul className="space-y-2 md:text-right xxs:text-left">
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