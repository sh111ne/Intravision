import styles from './CommentItem.module.scss';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { Comment } from '../../@types/types';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const formatDateTime = (dateString: string): string => {
    try {
      const date = parseISO(dateString);
      const formattedDate = format(date, 'd MMMM', { locale: ru });
      const formattedTime = format(date, 'HH:mm', { locale: ru });
      return `${formattedDate}, ${formattedTime} прокомментировал`;
    } catch (error) {
      console.error('Ошибка форматирования даты:', error);
      return 'Неверная дата';
    }
  };

  return (
    <li className={styles.comment}>
      <div className={styles.commentBlock}>
        <div className={styles.commentBlockUser}>
          <div className={styles.avatar}></div>
        </div>
        <div className={styles.commentBlockMessage}>
          <div className={styles.userData}>
            <span className={styles.userDataName}>{comment.userName}</span>
            <span className={styles.userDataDate}>{formatDateTime(comment.createdAt)}</span>
          </div>
          <p>{comment.comment}</p>
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
