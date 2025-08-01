import React, {useCallback, useState} from 'react'
import { useDropzone } from 'react-dropzone';
import type { FileWithPath } from 'react-dropzone';

import { Button } from '../button'


type FileUploaderProps ={
    fieldChange:(FILES :File[]) =>void;
    mediaUrl:string;
}


const FileUploader = ({fieldChange,mediaUrl}:FileUploaderProps) => {
    
    const [file,setFile]=useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState(mediaUrl);
    
    const onDrop = useCallback(
        (acceptedFiles:FileWithPath[]) => {
     setFile(acceptedFiles);
     fieldChange(acceptedFiles);
     setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, [file])
  
  
  
  
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept:{
        'image/*':['.png','.jpeg','.jpg','.svg' ] 
    }
})
  return (
     <div {...getRootProps()} className='flex flex-center flex-col
      bg-dark-3 rounded-xl cursor-pointer text-white'>
      <input {...getInputProps()} className='cursor-pointer'/>
      {
        fileUrl?(
            <>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
           <img 
           src={fileUrl}
           alt='image'
           className='`file_uploader_img'/>
            </div>
           <p className='file_uploader-label'>Click or drag photo to replace</p>
         
          </>
        ):(
            <div className='file_uploader-box'>
                <img
                src='/photos/icons/file-upload.svg'
                width={96}
                height={77}
                alt='file-upload'
                />
                <h3 className='base-mediium text-light-2 mb-2 mt-6'>Drag Photo Here</h3>
                <p className='text-light-4 small-regular mb-6'>SVG,PNG,JPG</p>
            
                 <Button className='shad-button_dar_4k'>
                    Select from Computer
                 </Button>
            
            </div>

        )
          
      }
    </div>
  )
}

export default FileUploader
