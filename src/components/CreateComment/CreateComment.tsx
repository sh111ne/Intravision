import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './CreateComment.module.scss';
import { useUpdateTaskMutation } from '../../api/applicationsApi';
import type { CreateCommentProps, NewComment } from '../../@types/types';
import { tenantguid } from '../../shared/constants';

const CreateComment = ({ newApplication, onCommentAdded }: CreateCommentProps) => {
  const { register, handleSubmit, reset, watch } = useForm<NewComment>({
    mode: 'onChange',
  });

  const [updateTask, { isLoading: isUpdating, error }] = useUpdateTaskMutation();

  const commentValue = watch('comment');
  const isDisabled = !commentValue || commentValue.trim() === '';

  const onSubmit: SubmitHandler<NewComment> = async (newComment) => {
    try {
      console.log(newComment);
      await updateTask({
        tenantguid,
        taskData: {
          ...newApplication,
          comment: newComment.comment,
        },
      }).unwrap();

      reset();
      onCommentAdded();
    } catch (err) {
      console.error('Ошибка отправки формы', err);
    }
  };
  return (
    <div className={styles.contentTextCommCreate}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="comment" className={styles.label}>
          <span className={styles.title}>Добавление комментария</span>
          <input id="comment" className={styles.input} {...register('comment')} />
          <span className={styles.errorInput}></span>
        </label>
        <button type="submit" disabled={isDisabled} className={styles.buttonSubmit}>
          {isUpdating ? 'Сохранение' : 'Сохранить'}
        </button>
      </form>
      <div className={styles.error}>
        {error && (
          <span className={styles.errorComment}>
            Ошибка отправки комментария, попробуйте позже.
          </span>
        )}
      </div>
    </div>
  );
};

export default CreateComment;
