import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useState} from "react";
import {useSession, getSession, signOut} from "next-auth/react";

export default function Home() {
    const {data: session} = useSession()
    const handleSignOut = () =>{
        signOut()
    }
  return (
      <div>
          <Head>
              <title>Home Page</title>
          </Head>
          <main>
              <h1 className="text-3xl font-bold underline">
                  Hello world!
              </h1>
              {session?User({session, handleSignOut}):Guest()}
          </main>
      </div>

  )
}

//guest user

const Guest = ()=>{
    return (
        <main className={'container mx-auto text-center py-20'}>
            <h3 className={'text-4xl font-bold'}>Guest Homepage</h3>
            <div className={'flex justify-center'}>
                <Link href={'/Login'} className={'mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray'}>Sign In</Link>
            </div>
        </main>
    )
}

//authorize user

const User = ({session,handleSignOut})=>{
    return (
        <main className={'container mx-auto text-center py-20'}>
            <h3 className={'text-4xl font-bold'}>Authorize user Homepage</h3>
            <div className={'details'}>
                <h5>{session.user.name}</h5>
                <h5>{session.user.email}</h5>
            </div>
            <div className={'flex justify-center'}>
                <button className={'mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50'} onClick={handleSignOut}>Sign Out</button>
            </div>
            <div className={'flex justify-center'}>
                <Link href={'/login'} className={'mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray'}>Profile Page</Link>
            </div>
        </main>
    )
}

export async function getServerSideProps({req}){
    const session = await getSession({req})
    if(!session){
        return {
            redirect:{
                destination: '/Login',
                permanent: false
            }
        }
    }
    return {
        props:{session}
    }
}