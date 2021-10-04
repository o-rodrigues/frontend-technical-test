import type { FC, ReactElement } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Avatar from 'assets/missing_avatar.png'
import styles from 'styles/components/ConversationCard.module.css';
import { Conversation } from 'types/conversation';
import { AVATAR_CARD_SIZE } from 'utils/constants';


interface IProps {
  conversation: Conversation
}

const ConversationCard: FC<IProps> = ({ conversation }): ReactElement => (
  <Link href={`/messages/${conversation.id}`}>
    <a className={styles.container}>
      <div className={styles.avatar}>
        <Image alt="Recipient's avatar" height={AVATAR_CARD_SIZE} src={Avatar} width={AVATAR_CARD_SIZE} />
      </div>
      <div className={styles.recipient}>
        <div className={styles.name}>{conversation.recipientNickname}</div>
        <div className={styles.preview}>Preview placeholder</div>
      </div>
    </a>
  </Link>
);

export default ConversationCard