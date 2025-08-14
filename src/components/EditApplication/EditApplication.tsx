import { useGetOneTaskQuery } from '../../api/applicationsApi';
import styles from './EditApplication.module.scss';

type EditApplicationProps = {
  active: number;
  setActive: (id: number | undefined) => void;
};

const EditApplication = ({ active, setActive }: EditApplicationProps) => {
  const {
    data: task,
    isLoading,
    error,
  } = useGetOneTaskQuery({
    tenantguid: '3c1d64a0-ace0-40ed-9901-7a20bf7f7d34',
    id: active,
  });

  console.log(task, 'заявка');
  return (
    <div className={styles.editBlock}>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <div>Ошибка!</div>
      ) : task ? (
        <div>
          <div className={styles.title}>
            <span>{task.id}</span>
            <span>{task.name}</span>
            <button onClick={() => setActive(undefined)}>X</button>
          </div>
          <div className={styles.content}>
            <div className={styles.contentText}>
              <div className={styles.contentTextDesc}>{task.description}</div>
              <div className={styles.contentTextCommCreate}></div>
              <ul className={styles.contentTextCommList}>
                {task.lifetimeItems &&
                  task.lifetimeItems.map((el) => {
                    return (
                      <li key={el.id}>
                        <div className={styles.user}>{el.fieldName ?? 'Аноним'}</div>
                        <div className={styles.comment}>{el.comment}</div>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={styles.contentTags}></div>
          </div>
        </div>
      ) : (
        <div>Заявка не найдена</div>
      )}
    </div>
  );
};

export default EditApplication;
