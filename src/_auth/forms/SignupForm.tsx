
import { zodResolver } from "@hookform/resolvers/zod"
import {Link,useNavigate} from 'react-router-dom'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import  { SignupValidation } from "../../lib/validation"
import { z } from "zod"
import { Loader } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import {  useCreateUserAccount, useSignInAccount} from "../../lib/react-query/queriesAndMutations"
import { useUserContext } from "../../context/AuthContext"
import { account } from "../../lib/appwrite/config"

const SignupForm = () => {
    const { toast }=useToast();
    const { checkAuthUser , isLoading:isUserLoading } =useUserContext();
    const navigate=useNavigate();


   const{ mutateAsync:createUserAccount,isPending :isCreatingAccount} = useCreateUserAccount();
  
   const {mutateAsync:signInAccount, isPending:isSigningIn}=useSignInAccount();

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name:'',
            username: "",
            email:'',
            password:'',
        },
    })

   
    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        const newUser = await createUserAccount(values);
         
         if(!newUser){
            return toast({ title: 'Sign up failed.Please try again'});
        }

        try {
    await account.deleteSession("current");
  } catch (err) {
    console.log("No active session or already logged out.");
  }

        const session = await signInAccount({
            email:values.email,
            password:values.password,
        })
        if(!session){
            return toast({title: 'Sign in failed . Pleae try again.'})
        }
        const isLoggedIn = await checkAuthUser();

        if(isLoggedIn){
            form.reset(); 
            navigate('/')
        }
        else{
            return toast({title:'Sign up failed. Please try again.'})
        }
    }

    return (
        
            <Form {...form}>

                <div className="sm:w-420 flex-center flex-col">
                    <div className="flex flex-row items-center justify-center ">
                        <img className="h-15 w-10 pt-9" src="/photos/ChatGPT_Image_Jun_28__2025__12_38_39_AM-removebg-preview.png"/>
                    <h4 className="text-lg font-semibold pt-9  ">Gramoji</h4>  
                    </div>
                          
                       <h2 className="h3-bold md:h2-bold pt-0 sm:pt-0">Create a new account</h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">To use Gramoji enter your details</p>
                
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder="Enter name" {...field} />
                                </FormControl>
                               
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                     <FormField 
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className='pt-2'>
                                <FormLabel>Userame</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder="Enter Username" {...field} />
                                </FormControl>
                               
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                  
                   <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='pt-2'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder="Enter email" {...field} />
                                </FormControl>
                               
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='pt-2 pb-3'>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Enter password" {...field} />
                                </FormControl>
                               
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className='shad-button_primary w-full '>
                        {isCreatingAccount?(
                            <div className="flex-center">
                             <Loader/>   Loading...
                            </div>
                        ):
                        "Sign up"}
                    </Button>
                    <p  className="text-small-regular text-center mt-5">
                   Already have an account?
                   <Link to='/sign-in' className="text-primary-500 text-small-semibold ml-1">Log in</Link>
                   
                    </p>
                </form>
                </div>
            </Form>


       
    )
}

export default SignupForm
