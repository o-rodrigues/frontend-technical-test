import { FC, ReactElement, useState } from 'react'
import { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'

import Logo from 'assets/lbc-logo.webp'
import MessageInput from 'components/MessageInput';
import MessagesList from 'components/MessagesList';
import RedirectionLink from 'components/RedirectionLink';
import { loggedUserId } from 'pages/_app';
import HTTPClient from 'services/httpClient';
import styles from 'styles/Messages.module.css'
import { Conversation } from 'types/conversation';
import { Message } from 'types/message';
import { getMessageDate } from 'utils/getMessageDate';
import { getMessageTime } from 'utils/getMessageTime';

interface IProps {
  conversation: Conversation
  messages: Message[]
}

const Messages: FC<IProps> = ({ conversation, messages }): ReactElement => {
  const [ messagesList, setMessageList] = useState<Message[]>(messages)

  const year: number = new Date().getFullYear();
  const finalTimeStamp: number = messages[messages.length -1].timestamp
  const finalDate: string = getMessageDate(finalTimeStamp)
  const finalTime: string = getMessageTime(finalTimeStamp)

  function updateMessagesList(message: Message): void {
    setMessageList((prevMessages: Message[]): Message[] => [ ...prevMessages, message ])
  }

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
        <div className={styles.header}>
          <div>{conversation.recipientNickname} - You</div>
          <div className={styles.timestamp}>Last message {finalDate} at {finalTime}</div>
        </div>
        <MessagesList conversation={conversation} messages={messagesList} />
        <MessageInput conversationId={conversation.id} updateMessagesList={updateMessagesList} />
      </main>

      <footer className={styles.footer}>
        &copy; leboncoin - {year}
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const conversationId: string = Array.isArray(context.params.conversationId)
    ? context.params.conversationId[0]
    : context.params.conversationId;
  const getMessagesResponse: AxiosResponse<Message[]>  = await HTTPClient.get(`messages/${conversationId}`)
  const messages: Message[] = await getMessagesResponse.data

  // Find the sender nickname (not in the messages/:id call...)
  const getConversationsResponse: AxiosResponse<Conversation[]>  = await HTTPClient.get(`conversations/${loggedUserId}`)
  const conversation: Conversation[] = await getConversationsResponse.data.filter(({id}) => id.toString() === conversationId)

  return { props: { messages, conversation: conversation[0]} }
}

export default Messages