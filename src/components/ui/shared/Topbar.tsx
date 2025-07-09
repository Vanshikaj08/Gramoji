import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../button'
import { useSignOutAccount } from '../../../lib/react-query/queriesAndMutations'
import { useUserContext } from '../../../context/AuthContext'

const Topbar = () => {
    const{mutate:signOut ,isSuccess} =useSignOutAccount();
const {user}=useUserContext();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isSuccess) navigate(0);

    }, [isSuccess])
  return (
<section className='topbar'>
    

    <div className='flex-between py-4 px-5'>
       <Link to='/' className='flex  items-center'>
       <img 
       src='/photos/ChatGPT_Image_Jun_28__2025__12_38_39_AM-removebg-preview.png'
       alt='logo'
       width={50}
       height={325}
       
       />
       <span className=' sm:text-lg md:text-xl lg:text-2xl font-semibold'>Gramoji</span>
       </Link> 
    <div className='flex gap-2'>
        <Button variant='ghost' className='shad-button_ghost '
        onClick={() => signOut()}>
            <img src='/photos/icons/logout.svg'/>
        </Button>
        <Link to={`/profile/${user.id} `} className='flex-center gap-3'>
        <img
          src={user.imageUrl || '/photos/icons/profile-placeholder.svg'}
           alt='profile'
           className='h-10 w-10 rounded-full'
           
           
           />
        </Link>

    </div>
    </div>
</section>
  )
}

export default Topbar
