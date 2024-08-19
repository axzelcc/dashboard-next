'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { CiBookmarkCheck } from 'react-icons/ci'

interface Props {
  path: string;
  name: string;
  icon: React.ReactNode;
}


export const SidebarItem = ({path, name, icon}:Props) => {

  const pathname = usePathname();

  return (
    <>
      {/* TODO: src/components <SidebarItem /> */}
      {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}

        <Link 
          href={path}
          className=          {
            `${(pathname===path)&&['text-white bg-gradient-to-r from-sky-600 to-cyan-400']}
            relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-gradient-to-r
            hover:from-sky-600 hover:to-cyan-400 hover:text-white`
          }  
          >
          {icon}
          <span className="group-hober:text-white-700">{name}</span>
        </Link>
     
    </>
  )
}