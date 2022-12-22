import React, {useState} from 'react';
import Head from "next/head";
import Layout from "../layout/Layout";
import Link from "next/link";
import styles from '../styles/Form.module.css'
import Image from "next/image";
import google from '../public/Images/icons8-google.svg'
import github from '../public/Images/icons8-github.svg'
import { HiAtSymbol,HiFingerPrint } from "react-icons/hi";
import {signIn, signOut} from "next-auth/react";
import {useFormik} from 'formik'
import login_validate from "../lib/validate";

const Login = () => {
    const [show, setShow] = useState(false);
    //formik hook
    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        validate: login_validate,
        onSubmit
    })
    console.log(formik.errors)
    async function onSubmit(values){
        console.log(values)
    }
    //google handle function
    const handleGoogleSignIn = async () =>{
        signIn('google', {callbackUrl: "http://localhost:3000"})
    }

    //github handle function
    const handleGithubSignIn = async () =>{
        signIn('github', {callbackUrl: "http://localhost:3000"})
    }
    return (
        <Layout>
            <Head>
                <title>Login Page</title>
            </Head>
            <section className={'w-3/4 mx-auto flex flex-col gap-10'}>
                <div className={'title'}>
                    <h1 className={'text-gray-800 text-4xl font-bold py-4'}>Explore</h1>
                    <p className={'w-3/4 mx-auto text-gray-400'}>Lorem epsun hey what you doing!</p>
                </div>
                <form className={'flex flex-col gap-5'} onSubmit={formik.handleSubmit}>

                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-500':''}`}>
                        <input
                            className={styles.input_text}
                            type={'email'}
                            name={'email'}
                            placeholder={'Email'}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            {...formik.getFieldProps('email')}
                        />
                        <span className={'icon flex items-center px-4'}>
                            <HiAtSymbol size={25}/>
                        </span>
                    </div>
                    {formik.errors.email && formik.touched.email?<span className={'text-rose-500'}>{formik.errors.email}</span>: <></>}
                    <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-500':''}`}>
                        <input
                            className={styles.input_text}
                            type={`${show?"text":"password"}`}
                            name={'password'}
                            placeholder={'password'}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            {...formik.getFieldProps('password')}
                        />
                        <span className={'icon flex items-center px-4'} onClick={()=>setShow(!show)}>
                            <HiFingerPrint size={25}/>
                        </span>
                    </div>
                    {formik.errors.password && formik.touched.password?<span className={'text-rose-500'}>{formik.errors.password}</span>: <></>}
                    <div className={'input_button'}>
                        <button className={styles.button} type={'submit'}>
                            Login
                        </button>
                    </div>
                    <div className={'input_button'}>
                        <button onClick={handleGoogleSignIn} className={styles.button_custom} type={'button'}>
                            Sign in with google
                            <Image src={google} width={25} height={25}></Image>
                        </button>
                    </div>
                    <div className={'input_button'}>
                        <button onClick={handleGithubSignIn} className={styles.button_custom} type={'button'}>
                            Sign in with github
                            <Image src={github} width={25} height={25}></Image>
                        </button>
                    </div>
                </form>
                <p className={'text-center text-gray-50 '}>Dont have an account yet?<Link href={'register'} className={'text-blue-500'}>Sign
                    up!</Link></p>
            </section>
        </Layout>
    );
};

export default Login;