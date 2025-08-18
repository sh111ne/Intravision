import { useState } from 'react';
import { useGetOneTaskQuery } from '../../api/applicationsApi';
import { useAppSelector } from '../../redux/store';
import styles from './EditApplication.module.scss';
import SelectModal from '../SelectModal/SelectModal';

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

  const { statuses, priorities, users } = useAppSelector((state) => state.applicationsSlice);

  const [visibleStatus, setVisibleStatus] = useState(false);
  const [visibleUser, setVisibleUsers] = useState(false);
  const [visiblePriority, setVisiblePriority] = useState(false);

  console.log(task, 'заявка');
  console.log(statuses, 'статусы');
  console.log(priorities, 'приоритеты');
  console.log(users, 'юзеры');
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
                        <div className={styles.comment}>{el.comment}</div> - коммент
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={styles.contentTags}>
              <div className={styles.contentTagsStatus}>
                <span>Статус</span>
                <span onClick={() => setVisibleStatus(!visibleStatus)}>{task.statusName}</span>
                {visibleStatus && <SelectModal obj={statuses} />}
              </div>
              <div className={styles.contentTagsApplicant}>
                <span>Заявитель</span>
                <span>{task.initiatorName}</span>
              </div>
              <div className={styles.contentTagsCreated}>
                <span>Создан</span>
                <span>{task.createdAt && task.createdAt.split('T')[0].replace(/-/g, '.')}</span>
              </div>
              <div className={styles.contentTagsExecutor}>
                <span>Испольнитель</span>
                <span onClick={() => setVisibleUsers(!visibleUser)}>{task.executorName}</span>
                {visibleUser && <SelectModal obj={users} />}
              </div>
              <div className={styles.contentTagsPriority}>
                <span>Приоритет</span>
                <span onClick={() => setVisiblePriority(!visiblePriority)}>
                  {task.priorityName}
                </span>
                {visiblePriority && <SelectModal obj={priorities} />}
              </div>
              <div className={styles.contentTagsTerm}>
                <span>Срок</span>
                <span>
                  {task.resolutionDatePlan
                    ? task.resolutionDatePlan.split('T')[0].replace(/-/g, '.')
                    : '-'}
                </span>
              </div>
              <div className={styles.contentTagsOther}>
                <span>Теги</span>
                <ul className={styles.tagsList}>
                  {task.tags &&
                    task.tags.map((tag) => {
                      return (
                        <li key={tag.id} className={styles.tag}>
                          {tag.name}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Заявка не найдена</div>
      )}
    </div>
  );
};

export default EditApplication;
