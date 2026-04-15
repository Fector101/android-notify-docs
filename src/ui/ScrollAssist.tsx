import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop: React.FC = () => {
    const routePath = usePathname();
    const onTop = () => window.scrollTo(0, 0);
    useEffect(onTop, [routePath]);
    return null;
};

const ScrollToSection = () => {
    const pathname = usePathname();
    const [hash, setHash] = useState<string>("");
    useEffect(() => {
        setHash(window.location.hash);
    }, [pathname]);

    const [scroll_top, setScrollToTop] = useState<React.ReactNode>(null);
    useEffect(() => {
        if (hash) {
            const section = document.querySelector(hash) as HTMLElement;
            // console.log(hash,section)
            if (section) {
                const headerHeight = 70
                window.scrollTo({
                    top: section.offsetTop - headerHeight,
                    behavior: "smooth",
                });
            }
        }else{
            console.log('else....')
            setScrollToTop(<ScrollToTop/>)
        }
    }, [hash]);

    return scroll_top
};

export { ScrollToSection };
