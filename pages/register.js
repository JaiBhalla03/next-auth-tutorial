import React, {useState} from 'react';
import Head from "next/head";
import Layout from "../layout/Layout";
import styles from "../styles/Form.module.css";
import {HiAtSymbol, HiFingerPrint, HiOutlineUser} from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import {useFormik} from "formik";
import {registerValidate} from "../lib/validate";

const Register = () => {
    const [show, setShow] = useState({
        password: false,
        cpassword: false
    });
    const formik = useFormik({
        initialValues:{
            username:'',
            email:'',
            password:'',
            cpassword:'',
        },
        validate: registerValidate,
        onSubmit
    })
    async function onSubmit(values){
        console.log(values)
    }
    return (
        <Layout>
            <Head>
                <title>Register Page</title>
            </Head>
            <section className={'w-3/4 mx-auto flex flex-col gap-10'}>
                <div className={'title'}>
                    <h1 className={'text-gray-800 text-4xl font-bold py-4'}>Register</h1>
                    <p className={'w-3/4 mx-auto text-gray-400'}>Lorem epsun hey what you doing!</p>
                </div>
                <form className={'flex flex-col gap-5'} onSubmit={formik.handleSubmit}>
                    <div className={`${styles.input_group} ${formik.errors.username && formik.touched.username ? 'border-rose-500':''}`}>
                        <input
                            className={styles.input_text}
                            type={'text'}
                            name={'username'}
                            placeholder={'username'}
                            {...formik.getFieldProps('username')}
                        />
                        <span className={'icon flex items-center px-4'}>
                            <HiOutlineUser size={25}/>
                        </span>
                    </div>
                    {formik.errors.username && formik.touched.username?<span className={'text-rose-500'}>{formik.errors.username}</span>: <></>}
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-500':''}`}>
                        <input
                            className={styles.input_text}
                            type={'email'}
                            name={'email'}
                            placeholder={'Email'}
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
                            type={`${show.password?"text":"password"}`}
                            name={'password'}
                            placeholder={'password'}
                            {...formik.getFieldProps('password')}
                        />
                        <span className={'icon flex items-center px-4'} onClick={()=>setShow({...show, password: !show.password})}>
                            <HiFingerPrint size={25}/>
                        </span>
                    </div>
                    {formik.errors.password && formik.touched.password?<span className={'text-rose-500'}>{formik.errors.password}</span>: <></>}
                    <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-500':''}`}>
                        <input
                            className={styles.input_text}
                            type={`${show.cpassword?"text":"password"}`}
                            name={'cpassword'}
                            placeholder={'confirm-password'}
                            {...formik.getFieldProps('cpassword')}
                        />
                        <span className={'icon flex items-center px-4'} onClick={()=>setShow({...show, cpassword: !show.cpassword})}>
                            <HiFingerPrint size={25}/>
                        </span>
                    </div>
                    {formik.errors.cpassword && formik.touched.cpassword?<span className={'text-rose-500'}>{formik.errors.cpassword}</span>: <></>}
                    <div className={'input_button'}>
                        <button className={styles.button} type={'submit'}>
                            Register
                        </button>
                    </div>
                </form>
                <p className={'text-center text-gray-50 '}>Have an account?<Link href={'Login'} className={'text-blue-500'}>Sign
                    in!</Link></p>
            </section>
        </Layout>
    );
};

export default Register;