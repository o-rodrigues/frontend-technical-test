import type { FC, ReactElement } from 'react'
import { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'

import Logo from 'assets/lbc-logo.webp'
import ConversationsList from 'components/ConversationsList';
import RedirectionLink from 'components/RedirectionLink';
import HTTPClient from 'services/httpClient';
import styles from 'styles/Conversations.module.css'
import { Conversation } from 'types/conversation';

interface IProps {
  conversations: Conversation[]
}

const Conversations: FC<IProps> = ({ conversations }): ReactElement => {
  const year: number = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>

      <header>
        <RedirectionLink href="/" >
          <Image alt="Leboncoin's logo" height={125} src={Logo} width={400} />
        </RedirectionLink>
      </header>

      <main className={styles.main}>
        <h2 className={styles.title}>Your conversations:</h2>
        <ConversationsList conversations={conversations} />
      </main>

      <footer className={styles.footer}>
        &copy; leboncoin - {year}
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const userId: string = Array.isArray(context.params.userId)
    ? context.params.userId[0]
    : context.params.userId;
  const res: AxiosResponse<Conversation[]>  = await HTTPClient.get(`conversations/${userId}`)
  const conversations: Conversation[] = await res.data

  return { props: { conversations } }
}

export default Conversations