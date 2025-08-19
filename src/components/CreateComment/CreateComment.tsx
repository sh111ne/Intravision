import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './CreateComment.module.scss';
import { useUpdateTaskMutation } from '../../api/applicationsApi';
import type { CreateCommentProps } from '../../@types/types';

type NewComment = {
  comment: string;
};

const CreateComment = ({ newApplication, onCommentAdded }: CreateCommentProps) => {
  const tenantguid = '3c1d64a0-ace0-40ed-9901-7a20bf7f7d34';
  const { register, handleSubmit, reset, watch } = useForm<NewComment>({
    mode: 'onChange',
  });

  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

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
      <span>Добавление комментария</span>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="comment" className={styles.label}>
          <input id="comment" className={styles.input} {...register('comment')} />
          <span className={styles.errorInput}></span>
        </label>
        <div className={styles.buttonsBottom}>
          <button type="submit" disabled={isDisabled} className={styles.buttonSubmit}>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
