import ConversationCard from 'components/ConversationCard';
import type { FC, ReactElement } from 'react'
import styles from 'styles/components/ConversationsList.module.css';
import { Conversation } from 'types/conversation';


interface IProps {
  conversations: Conversation[]
}

const ConversationsList: FC<IProps> = ({ conversations }): ReactElement => (
  <div className={styles.container}>
    {conversations.map((conversation: Conversation): JSX.Element => (
      <ConversationCard
        conversation={conversation}
        key={`conversation-card-${conversation.id}`}
      />
    ))}
  </div>
);

export default ConversationsList