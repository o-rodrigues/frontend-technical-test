import type { FC, ReactElement } from 'react'
import classNames from 'classnames'

import styles from 'styles/components/MessageCard.module.css'
import { Message } from 'types/message'

interface IProps {
  isRecipient?: boolean
  message: Message
  recipientNickName: string
}

const MessageCard: FC<IProps> = ({ isRecipient = false, message, recipientNickName }): ReactElement => {
  const containerClass: string = classNames(styles.container, isRecipient ? styles.recipient : styles.sender)
  return (
    <div className={containerClass}>
      {isRecipient && (<div className={styles.name}>{recipientNickName}</div>)}
      <div className={styles.message}>
        {message.body}
      </div>
    </div>
  )
}

export default MessageCard;