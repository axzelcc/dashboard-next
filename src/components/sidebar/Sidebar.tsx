import React from 'react'

import { CiLogout } from 'react-icons/ci'
import Link from 'next/link'
import Image from 'next/image'
import { SidebarItem } from './SidebarItem'
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPerson, IoPersonOutline } from 'react-icons/io5'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { LogoutButton } from './LogoutButton'

const MenuItems = [
  {
    icon: <IoCalendarOutline />,
    path: '/dashboard',
    name: 'Dashboard'
  },
  {
    icon: <IoCheckboxOutline />,
    path: '/dashboard/rest-todos',
    name: 'Categories'
  },
  {
    icon: <IoListOutline />,
    path: '/dashboard/server-todos',
    name: 'Server Actions'
  },
  {
    icon: <IoCodeWorkingOutline />,
    path: '/dashboard/cookies',
    name: 'Cookies'
  },
  {
    icon: <IoBasketOutline />,
    path: '/dashboard/products',
    name: 'Productos'
  },
  {
    icon: <IoPersonOutline />,
    path: '/dashboard/profile',
    name: 'Perfil'
  }
]

export const Sidebar = async() => {

  const session = await getServerSession(authOptions);

  const avatarUrl = ( session?.user?.image )
    ? session.user.image
    : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';

  const userName = session?.user?.name ?? 'No Name';
  const userRoles = session?.user?.roles ?? ['client'];

  return (
    <div>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            {/* TODO: Next/Link hacia dashboard */}
            <Link href="/dashboard" title="home">
              {/* Next/Image */}
              <Image width={100} height={100}
                src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" 
                alt="tailus logo"
              />
            </Link>
          </div>

          <div className="mt-8 text-center">
            {/* Next/Image */}
            <Image width={100} height={100}
              src={avatarUrl}
              alt="" 
              className="m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
              <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
              <span className="hidden text-gray-400 lg:block">{userRoles.join(',')}</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">

            {
              MenuItems.map(item => {
                return (
                <li key={item.name}>
                  <SidebarItem path={item.path} name={item.name} icon={item.icon}/>                
                </li>
              )})
            }

          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <LogoutButton />
        </div>
      </aside>
    </div>
  )
}
