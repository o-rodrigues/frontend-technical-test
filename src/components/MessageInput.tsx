import { ChangeEvent, FC, ReactElement, useState } from 'react'
import { AxiosResponse } from 'axios';
import moment from 'moment';
import Image from 'next/image'

import Send from 'assets/send.png'
import { loggedUserId } from 'pages/_app';
import httpClient from 'services/httpClient';
import styles from 'styles/components/MessageInput.module.css'
import { Message } from 'types/message';
import { ICON_SIZE } from 'utils/constants';


interface IProps {
  conversationId: number
  updateMessagesList(message: Message): void
}

const MessageInput: FC<IProps> = ({ conversationId, updateMessagesList }): ReactElement => {
  const [text, setText] = useState<string>('')

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    setText(e.target.value)
  }

  async function onClick(): Promise<void> {
    const form: Partial<Message> = {
      authorId: loggedUserId,
      body: text,
      conversationId,
      timestamp: moment().unix()
    }

    const data = await httpClient.post(`/messages/${conversationId}`, form)
      .then((res: AxiosResponse<Message>) => res.data)

    if(data) {
      updateMessagesList(data)
      setText('')
    }
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        onChange={onChange}
        placeholder="Send message"
        type="text"
        value={text}
      />
      <button className={styles.send} onClick={onClick}>
        <Image alt="Send" height={ICON_SIZE} src={Send} width={ICON_SIZE} />
      </button>
    </div>
  )
}

export default MessageInput