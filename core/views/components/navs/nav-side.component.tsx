import React from "react";
import { BookIcon, Icon, PackageIcon, StickerIcon, TagIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavSideItem {
  title: string
  icon: Icon,
  path: string
}


const navItems: INavSideItem[] = [
  { title: "Products", icon: PackageIcon, path: "/products" },
  { title: "Categories", icon: StickerIcon, path: "/categories" },
  { title: "Tags", icon: TagIcon, path: "/tags" },
  { title: "Brands", icon: BookIcon, path: "/brands" },
];

export default function NavSide() {
  const pathname = usePathname();
  
  return (
    <div className={ `NavSide bg-cyan-950 w-70 min-w-70 text-white` }>
      <div className="flex flex-col">
        { navItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = pathname.includes(item.path);
          return (
            <Link
              key={ index }
              href={ item.path }
              className={ `NavSide__item flex gap-2 py-3 px-4 transition duration-300 ease-in-out items-center
                ${isActive ? 'bg-cyan-700 text-white' : 'hover:bg-cyan-500'}` }
            >
              <IconComponent size={ 24 } />
              <span>{ item.title }</span>
            </Link>
          );
        }) }
      </div>
    </div>
  );
}