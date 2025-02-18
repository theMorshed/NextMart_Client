/* eslint-disable react/no-unescaped-entities */
"use client"
import ReCAPTCHA from "react-google-recaptcha";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginUser, reCaptchaTokenVerification } from "@/services/authService";
import { toast } from "sonner";
import { loginValidationSchema } from "./loginValidation";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginValidationSchema)
    });

    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirectPath');
    const router = useRouter();

    const handleRecaptcha = async (token: string | null) => {
        try {
            const res = await reCaptchaTokenVerification(token!);
            if (res?.success) {
                setReCaptchaStatus(true);
            }
        }catch(error) {
            console.error(error);
        }
    }

    const {formState: {isSubmitting}} = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await loginUser(data);
            if (res?.success) {
                toast.success(res?.message);
                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push('/profile');
                }
            } else {
                toast.error(res?.message);
            } 
        } catch(error) {
            console.error(error);
        }
    }
    return (
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
            <div className="flex items-center space-x-4 ">
                <Logo />
                <div>
                    <h1 className="text-xl font-semibold">Login</h1>
                    <p className="font-extralight text-sm text-gray-600">
                        Login in your account and enjoy services
                    </p>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>                       
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
                    <div className="ml-12 mt-5 mx-auto">
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
                            onChange={handleRecaptcha}
                        />
                    </div>
                    <Button disabled={!reCaptchaStatus} className="mt-5 w-full" type="submit">
                        {isSubmitting ? "Loging..." : "Login"}    
                    </Button>                 
                </form>
            </Form>
            <p className="text-sm text-gray-600 text-center my-3">
                Don't have an account <Link href="/register" className="text-primary">Register</Link>
            </p>
        </div>
    );
};

export default LoginForm;