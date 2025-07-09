// import { error } from "console";
import type { INewPost, INewUser } from "../../types";
import { useSignInAccount } from "../react-query/queriesAndMutations";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Permission, Role } from 'appwrite'
// import { Query } from "@tanstack/react-query";
import { Query } from 'appwrite';




export async function createUserAccount(user:INewUser){
  try{
    const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
    );
   

    
    if(!newAccount) throw Error;

    const avatarUrl=avatars.getInitials(user.name)

   const newUser = await saveUSerToDB({
     name:newAccount.name,
    username:user.username,
    accountID:newAccount.$id,
    email:newAccount.email,
   
    imageUrl:avatarUrl,
   })


    return newUser;
  }
  catch(error){
    console.log(error);
    return error;
  }
} 

export async function saveUSerToDB(user:{
  name:string;
  username?:string;
  accountID:string;
  email:string;
   bio:"";
  imageUrl:string;
  
 
}){
  try{
   const newUser =await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    ID.unique(),
    user,
   
   )
   return newUser;
  }
  catch(error){
console.log(error)
  }
}

export async function signInAccount(user: { email: string; password: string }) {

  
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
       user.password,
    );

    return session;
  } catch (error) {
    console.log("Login error:", error);
    return null;
  }
}

export async function getCurrentUser(){
  try{
   const currentAccount = await account.get();

   if(!currentAccount) throw Error;

   const currentUser =  await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal('accountID',currentAccount.$id)]
   )

   if(!currentUser) throw Error;

   return currentUser.documents[0];

  }
  catch(error){
    console.log(error);
    return null;
  }
}

export async function signOutAccount() {
  try{
   const session = await account.deleteSession('current');
   return session;
  }
  catch(error){
    console.log(error)

  }
  
}
export async function createPost(post:INewPost) {
  try{
   const uploadedFile = await uploadFile(post.file[0]);
   if(!uploadedFile) throw Error;

  //  console.log("🧾 File ID:", uploadedFile.$id);
   const fileUrl = storage.getFileView(appwriteConfig.storageId, uploadedFile.$id).href;

   console.log("Preview URL: ", fileUrl);
   if(!fileUrl){
    deleteFile(uploadedFile.$id)
    throw Error;
   }

    //convert tags into array
    const tags =post.tags?.replace(/ /g,'').split(',') || [];
    
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator:post.userId,
        caption:post.caption,
        imageUrl:fileUrl,
        imgID   :uploadedFile.$id,
        location:post.location,
        tags:tags,
      }
    );
    if(!newPost){
      await deleteFile(uploadedFile.$id)
      throw Error;
    }

 return newPost;

  }
  catch(error){
    console.log(error)
  }
}

export async function uploadFile(file:File) {
  try{
    console.log("Uploading File:", file); 

   const uploadedFile = await storage.createFile(
    appwriteConfig.storageId,
    ID.unique(),
    file,
    [
    Permission.read(Role.any()), 
    Permission.write(Role.any()) ,
  ]
   );
     console.log("✅ Uploaded File:", uploadedFile); 
   return uploadedFile;

  }
  catch(error){
    console.log(error)
  }
}

export function getFileView(fileId: string) {
  return storage.getFileView(appwriteConfig.storageId, fileId);
}
export async function deleteFile(fileId:string) {
  try{
     await storage.deleteFile(appwriteConfig.storageId,fileId)
     
     return {status : 'ok'}
    }
  catch(error){
    console.log(error)
  }
  
}

export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    [Query.orderDesc('$createdAt'),Query.limit(20)]
  )
  if(!posts) throw Error;

  return posts;
}

export async function likePost(postId:string , likesArray:string[]){
  try{
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes:likesArray
      }
    )
    if(!updatedPost) throw Error;

    return updatedPost;
  }
  catch(error){
    console.log(error)
  }
}

export async function savePost(postId:string , userId:string[]){
  try{
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
       user:userId,
       post:postId,
      }
    )
    if(!updatedPost) throw Error;

    return updatedPost;
  }
  catch(error){
    console.log(error)
  }
}

export async function deleteSavedPost(savedRecordId:string ){
  try{
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      savedRecordId,
      
    )
    if(!statusCode) throw Error;

    return {status: 'ok'};
  }
  catch(error){
    console.log(error)
  }
}