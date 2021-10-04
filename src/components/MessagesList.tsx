import type { FC, ReactElement } from 'react'
import MessageCard from 'components/MessageCard';
import styles from 'styles/components/MessagesList.module.css';
import { Message } from 'types/message';
import { Conversation } from 'types/conversation';


interface IProps {
  conversation: Conversation
  messages: Message[]
}

const MessagesList: FC<IProps> = ({ conversation, messages }): ReactElement => (
  <div className={styles.container}>
    {messages.map((message: Message): JSX.Element => (
      <MessageCard
        isRecipient={message.authorId === conversation.recipientId}
        message={message}
        key={`message-${message.id}`}
        recipientNickName={conversation.recipientNickname}
      />
    ))}
  </div>
);

export default MessagesList