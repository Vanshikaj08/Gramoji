import {Client, Account, Databases, Storage,Avatars} from 'appwrite'

export const appwriteConfig={
    projectId:'6860e4ef001d0cabd05a',
    url : import.meta.env.VITE_APPWRITE_URL,
    databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId:'68626ec10031323111f2',
    userCollectionId:import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId:import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId:import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID
}
export const client = new Client();


client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);





