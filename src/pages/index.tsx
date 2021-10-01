import type { FC, ReactElement } from 'react'
import { AxiosResponse } from 'axios'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Logo from 'assets/lbc-logo.webp'
import Avatar from 'assets/missing_avatar.png'

import RedirectionLink from 'components/RedirectionLink'
import { loggedUserId } from 'pages/_app'
import httpClient from 'services/httpClient'
import styles from 'styles/Home.module.css'
import { User } from 'types/user'
import { AVATAR_HOME_SIZE } from 'utils/constants'

interface IProps {
  user: User
}

const Home: FC<IProps> = ({ user }): ReactElement => {
  const year: number = new Date().getFullYear()

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta content="Frontend exercise for developpers who want to join us on leboncoin.fr" name="description"></meta>
      </Head>

      <header>
        <RedirectionLink href="/" >
          <Image alt="Leboncoin's logo" height={125} src={Logo} width={400} />
        </RedirectionLink>
      </header>

      <main className={styles.main}>
        <Image alt="User's avatar" height={AVATAR_HOME_SIZE} src={Avatar} width={AVATAR_HOME_SIZE} />
        <h1 className={styles.title}>Welcome, {user.nickname} !</h1>
        <RedirectionLink buttonStyled href={`/conversations/${user.id}`} >Check your conversations</RedirectionLink>
      </main>

      <footer className={styles.footer}>
        &copy; leboncoin - {year}
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const res: AxiosResponse<User>  = await httpClient.get(`users/${loggedUserId}`)
  const user: User = await res.data

  return { props: { user } }
}

export default Home