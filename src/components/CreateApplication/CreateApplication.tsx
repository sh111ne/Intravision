import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './СreateApplication.module.scss';
import { useCreateTaskMutation, useGetTasksQuery } from '../../api/applicationsApi';
import type { CreateApplicationProps, NewApplication } from '../../@types/types';
import { tenantguid } from '../../shared/constants';
import close from '/img/close.svg?url';

const CreateApplication = ({ onClose, setActive }: CreateApplicationProps) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<NewApplication>({
    mode: 'onBlur',
  });

  const [createTask, { isLoading, isError }] = useCreateTaskMutation();
  const { refetch } = useGetTasksQuery(tenantguid);

  const onSubmit: SubmitHandler<NewApplication> = async (taskData) => {
    try {
      console.log(taskData);
      const response = await createTask({ tenantguid, taskData }).unwrap();

      console.log('Заявка создана, ID:', response);
      await refetch();
      setActive(response);
      reset();
      onClose();
    } catch (err) {
      console.error('Ошибка отправки формы', err);
    }
  };

  return (
    <div className={styles.createBlock}>
      <div className={styles.title}>
        <span className={styles.titleText}>Новая заявка</span>
        <img src={close} alt="close" onClick={onClose} className={styles.titleClose} />
      </div>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className={styles.label}>
            <span className={styles.labelText}>Название</span>
            <input
              id="name"
              className={styles.inputName}
              {...register('name', {
                required: 'Заполните поле',
              })}
            />
            <span className={styles.errorInput}>{errors.name && String(errors.name.message)}</span>
          </label>
          <label htmlFor="description" className={styles.label}>
            <span className={styles.labelText}>Описание</span>
            <input
              id="description"
              className={styles.inputDesc}
              {...register('description', {
                required: 'Заполните поле',
              })}
            />
            <span className={styles.errorInput}>
              {errors.description && String(errors.description.message)}
            </span>
          </label>

          <div className={styles.buttonsBottom}>
            <button type="submit" disabled={!isValid || isLoading} className={styles.buttonSubmit}>
              {isLoading ? 'Сохранение' : 'Сохранить'}
            </button>
          </div>
        </form>
        {isError && !isLoading && (
          <div className={styles.errorBlock}>
            <span>Ошибка отправки формы</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateApplication;
