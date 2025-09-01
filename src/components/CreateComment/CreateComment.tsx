import { useForm } from 'react-hook-form';
import styles from './CreateComment.module.scss';
import type { CreateCommentProps, NewComment } from '../../@types/types';

const CreateComment = ({ newApplication, setNewApplication }: CreateCommentProps) => {
  const { register } = useForm<NewComment>({
    mode: 'onChange',
  });

  const onChangeComment = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewApplication((prev) => ({
      ...prev,
      comment: e.target.value,
    }));
  };
  return (
    <div className={styles.contentTextCommCreate}>
      <form className={styles.form}>
        <label htmlFor="comment" className={styles.label}>
          <span className={styles.title}>Добавление комментария</span>
          <textarea
            id="comment"
            className={styles.input}
            {...register('comment')}
            onChange={(e) => onChangeComment(e)}
            value={newApplication.comment || ''}
          />
          <span className={styles.errorInput}></span>
        </label>
      </form>
    </div>
  );
};

export default CreateComment;
