import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../button'
import { useSignOutAccount } from '../../../lib/react-query/queriesAndMutations'
import { useUserContext } from '../../../context/AuthContext'
import { sidebarLinks } from '../../../constants'
import type { INavLink } from '../../../types'

const LeftSidebar = () => {
    const{mutate:signOut ,isSuccess} =useSignOutAccount();
    const {user}=useUserContext();
    const navigate = useNavigate();
    const {pathname} =useLocation();

    useEffect(()=>{
        if(isSuccess) navigate(0);

    }, [isSuccess])
  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-3'>
        <Link to='/' className='flex items-center'>
               <img 
               src='/photos/ChatGPT_Image_Jun_28__2025__12_38_39_AM-removebg-preview.png'
               alt='logo'
               width={60}
               height={325}
               
               /><span className=' sm:text-lg md:text-xl lg:text-2xl font-semibold'>Gramoji</span>
               </Link> 

            <Link to={`/profile/${user.id}`}
            className='flex gap-3 items-center'>
                <img
               src={user.imageUrl || '/photos/icons/profile-placeholder.svg'}
           alt='profile'
           className='h-12 w-12 rounded-full ml-1.5 '
           />
           <div className='flex flex-col'>
            <p className='body-bold'>
                {user.name}
            </p>
            <p className='small-regular text-light-3'>
                @{user.username  }
            </p>

           </div>
            </Link>

     <ul className='flex flex-col gap-5' >
      {sidebarLinks.map((link:INavLink)=>{
    const isActive =pathname ===link.route;
       return(
        <li key={link.label}
            className={`leftsidebar-link group ${
                isActive && 'bg-primary-500'
            }`}>
        <NavLink 
        to={link.route}
        className='flex gap-3 items-center p-4'
        >
            <img 
            src={link.imgURL}
            alt={link.label}
            className={`group-hover:invert-white ${isActive && 'invert-white'}`}
            />
             {link.label}
        </NavLink>
        </li>
       )
      })}
     </ul>
      </div>

      <Button 
      variant='ghost'
       className='shad-button_ghost '
              onClick={() => signOut()}>
                  <img src='/photos/icons/logout.svg'/>
                  <p className='small-medium lg:base-medium'>Logout</p>
              </Button>
    </nav>
  )
}

export default LeftSidebar
