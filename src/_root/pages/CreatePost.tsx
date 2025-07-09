import React from 'react'
import PostForm from '../../components/forms/PostForm'

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
      <div className='max-w-5xl flex-start gap-3 justify-start'>
        <img 
        src='/photos/icons/add-post.svg'
         className="filter invert"
        width={36}
        height={36}
        alt='add'
        />
        <h2 className='h4-bold md:h4-bold text-left  w-full'> Create Post</h2>
      </div>
      <PostForm/>
    </div>
    </div>
  )
}

export default CreatePost
