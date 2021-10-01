import type { FC, ReactElement } from 'react'
import { AxiosResponse } from 'axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Logo from 'assets/lbc-logo.webp'
import Avatar from 'assets/missing_avatar.png'
import { loggedUserId } from 'pages/_app'
import httpClient from 'services/httpClient'
import styles from 'styles/Home.module.css'
import { User } from 'types/user'

interface IProps {
  user: User
}

const Home: FC<IProps> = ({ user }): ReactElement => {
  const year: number = new Date().getFullYear()

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>

      <header className={styles.header}>
        <Image src={Logo} alt="Leboncoin's logo" width={400} height={125} />
      </header>

      <main className={styles.main}>
        <Image src={Avatar} alt="user's avatar" width={125} height={125} />
        <h1 className={styles.title}>Welcome, {user.nickname} !</h1>
        <Link href={`/`}>
          <a className={styles.link}>Check your conversations</a>
        </Link>
      </main>

      <footer className={styles.footer}>
        &copy; leboncoin - {year}
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const res: AxiosResponse<User>  = await httpClient.get(`users/${loggedUserId}`)
  const user: User = await res.data

  return { props: { user } }
}

export default Home