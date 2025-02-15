"use client"
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerValidationSchema } from "./registerValidation";
import { registerUser } from "@/services/authService";
import { toast } from "sonner";

const RegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(registerValidationSchema)
    });

    const {formState: {isSubmitting}} = form;
    const password = form.watch('password');
    const confirmPassword = form.watch('confirmPassword');
    console.log(password, confirmPassword);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const res = await registerUser(data);
        if (res?.success) {
            toast.success(res?.message);
        } else {
            toast.error(res?.message);
        }
    }
    return (
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
            <div className="flex items-center space-x-4 ">
                <Logo />
                <div>
                    <h1 className="text-xl font-semibold">Register</h1>
                    <p className="font-extralight text-sm text-gray-600">
                        Join us today and start your journey!
                    </p>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />   
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />   
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />   
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} value={field.value || ""} />
                                </FormControl>
                                {
                                    confirmPassword && password !== confirmPassword ? (<FormMessage>Password does not match</FormMessage>) : (<FormMessage />)
                                }                                
                            </FormItem>
                        )}
                    />   
                    <Button disabled={confirmPassword && password !== confirmPassword} className="mt-5 w-full" type="submit">
                        {isSubmitting ? "Registering..." : "Register"}    
                    </Button>                 
                </form>
            </Form>
            <p className="text-sm text-gray-600 text-center my-3">
                Already have an account ?
                <Link href="/login" className="text-primary">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;