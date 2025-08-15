import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './СreateApplication.module.scss';
import { useCreateTaskMutation, useGetTasksQuery } from '../../api/applicationsApi';

type NewApplication = {
  name: string;
  description: string;
};

type CreateApplicationProps = {
  onClose: () => void;
  setActive: (id: number) => void;
};

const CreateApplication = ({ onClose, setActive }: CreateApplicationProps) => {
  const tenantguid = '3c1d64a0-ace0-40ed-9901-7a20bf7f7d34';
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<NewApplication>({
    mode: 'onBlur',
  });

  const [createTask, { isLoading }] = useCreateTaskMutation();
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
        <span>Название</span>
        <button onClick={onClose}>Х</button>
      </div>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className={styles.label}>
            <input
              id="name"
              className={styles.input}
              {...register('name', {
                required: 'Заполните поле',
              })}
            />
            <span className={styles.errorInput}>{errors.name && String(errors.name.message)}</span>
          </label>
          <label htmlFor="description" className={styles.label}>
            <input
              id="description"
              className={styles.input}
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
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateApplication;
