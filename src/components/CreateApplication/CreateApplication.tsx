import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './СreateApplication.module.scss';

type NewApplication = {
  name: string;
  description: string;
};

type CreateApplicationProps = {
  onClose: () => void;
};

const CreateApplication = ({ onClose }: CreateApplicationProps) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<NewApplication>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<NewApplication> = async (obj) => {
    try {
      console.log(obj);
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
            <button type="submit" disabled={!isValid} className={styles.buttonSubmit}>
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateApplication;
