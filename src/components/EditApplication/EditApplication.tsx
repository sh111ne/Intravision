import { useEffect, useState } from 'react';

import {
  useGetOneTaskQuery,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from '../../api/applicationsApi';
import { useAppSelector } from '../../redux/store';

import styles from './EditApplication.module.scss';

import SelectModal from '../SelectModal/SelectModal';
import CreateComment from '../CreateComment/CreateComment';

import type { ModifiedApplication } from '../../@types/types';

type EditApplicationProps = {
  active: number;
  setActive: (id: number | undefined) => void;
};

const EditApplication = ({ active, setActive }: EditApplicationProps) => {
  const tenantguid = '3c1d64a0-ace0-40ed-9901-7a20bf7f7d34';
  const {
    data: task,
    isLoading,
    error,
    refetch: refetchOneTask,
  } = useGetOneTaskQuery(
    {
      tenantguid: tenantguid,
      id: active,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const { refetch: refetchTasks } = useGetTasksQuery(tenantguid);

  const [newApplication, setNewApplication] = useState<ModifiedApplication>({
    id: 0,
    name: '',
    description: '',
    comment: '',
    price: 0,
    taskTypeId: 0,
    statusId: 0,
    priorityId: 0,
    serviceId: 0,
    resolutionDatePlan: '',
    initiatorId: 0,
    executorId: 0,
    executorGroupId: 0,
  });

  const { statuses, priorities, users } = useAppSelector((state) => state.applicationsSlice);

  const [visibleStatus, setVisibleStatus] = useState(false);
  const [visibleUser, setVisibleUsers] = useState(false);
  const [visiblePriority, setVisiblePriority] = useState(false);

  const getStatusNameById = (statusId: number) => {
    const status = statuses.find((s) => s.id === statusId);
    return status ? status.name : 'Неизвестный статус';
  };

  const getPriorityNameById = (priorityId: number) => {
    const priority = priorities.find((p) => p.id === priorityId);
    return priority ? priority.name : 'Неизвестный приоритет';
  };

  const getUserNameById = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : 'Не назначен';
  };

  const onChangeTags = async () => {
    try {
      if (!task) return;

      await updateTask({
        tenantguid,
        taskData: newApplication,
      }).unwrap();

      setActive(undefined);

      refetchTasks();
    } catch (err) {
      console.error('Ошибка при обновлении заявки:', err);
    }
  };

  useEffect(() => {
    if (task) {
      setNewApplication({
        id: task.id,
        name: task.name,
        description: task.description,
        comment: '',
        price: task.price,
        taskTypeId: task.taskTypeId,
        statusId: task.statusId,
        priorityId: task.priorityId,
        serviceId: task.serviceId,
        resolutionDatePlan: task.resolutionDatePlan,
        initiatorId: task.initiatorId,
        executorId: task.executorId,
        executorGroupId: task.executorGroupId,
      });
    }
  }, [task]);

  console.log(task, 'заявка');
  console.log(newApplication, 'На изменение');
  return (
    <>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <div>Ошибка!</div>
      ) : task ? (
        <div className={styles.editBlock}>
          <div className={styles.title}>
            <span>{task.id}</span>
            <span>{task.name}</span>
            <button onClick={() => setActive(undefined)}>X</button>
          </div>
          <div className={styles.content}>
            <div className={styles.contentText}>
              <div className={styles.contentTextDesc}>{task.description}</div>
              <CreateComment newApplication={newApplication} onCommentAdded={refetchOneTask} />
              <ul className={styles.contentTextCommList}>
                {task.lifetimeItems &&
                  task.lifetimeItems.map((el) => {
                    return (
                      <li key={el.id}>
                        {el.fieldName ? (
                          <></>
                        ) : (
                          <div className={styles.comment}>{el.comment} - коммент</div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={styles.contentTags}>
              <div className={styles.contentTagsStatus}>
                <span>Статус</span>
                <span onClick={() => setVisibleStatus(!visibleStatus)}>
                  {getStatusNameById(newApplication.statusId)}
                </span>
                {visibleStatus && (
                  <SelectModal
                    obj={statuses}
                    setNewApplication={setNewApplication}
                    name={'Статус'}
                    setVisible={setVisibleStatus}
                  />
                )}
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
                <span onClick={() => setVisibleUsers(!visibleUser)}>
                  {getUserNameById(newApplication.executorId)}
                </span>
                {visibleUser && (
                  <SelectModal
                    obj={users}
                    setNewApplication={setNewApplication}
                    name={'Исполнитель'}
                    setVisible={setVisibleUsers}
                  />
                )}
              </div>
              <div className={styles.contentTagsPriority}>
                <span>Приоритет</span>
                <span onClick={() => setVisiblePriority(!visiblePriority)}>
                  {getPriorityNameById(newApplication.priorityId)}
                </span>
                {visiblePriority && (
                  <SelectModal
                    obj={priorities}
                    setNewApplication={setNewApplication}
                    name={'Приоритет'}
                    setVisible={setVisiblePriority}
                  />
                )}
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
              <div className={styles.contentTagsEdit}>
                {newApplication.statusId !== task.statusId ||
                newApplication.priorityId !== task.priorityId ||
                newApplication.executorId !== task.executorId ? (
                  <button onClick={onChangeTags}>{isUpdating ? 'Изменение...' : 'Изменить'}</button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Заявка не найдена</div>
      )}
    </>
  );
};

export default EditApplication;
