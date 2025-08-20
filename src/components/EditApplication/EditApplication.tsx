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
import { tenantguid } from '../../shared/constants';

import close from '/img/close.svg?url';
import pen from '/img/pen.svg?url';

type EditApplicationProps = {
  active: number;
  setActive: (id: number | undefined) => void;
};

const EditApplication = ({ active, setActive }: EditApplicationProps) => {
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

  const getStatusRgbById = (statusId: number) => {
    const status = statuses.find((s) => s.id === statusId);
    return status ? status.rgb : '';
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
      refetchOneTask();
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
        <div className="loading">
          <span className="loader"></span>
        </div>
      ) : error ? (
        <div className={styles.errorBlock}>
          <span>Ошибка отправки формы</span>
        </div>
      ) : task ? (
        <div className={styles.editBlock}>
          <div className={styles.title}>
            <div className={styles.titleText}>
              <span className={styles.titleTextId}>№ {task.id}</span>
              <span className={styles.titleTextName}>
                {task.name.length > 135 ? task.name.substring(0, 132) + '...' : task.name}
              </span>
            </div>
            <img
              src={close}
              alt="close"
              onClick={() => setActive(undefined)}
              className={styles.titleClose}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.contentText}>
              <div className={styles.contentTextDesc}>
                <span>Описание</span>
                <p>{task.description}</p>
              </div>
              <CreateComment newApplication={newApplication} onCommentAdded={refetchOneTask} />
              <ul className={styles.contentTextCommList}>
                {task.lifetimeItems &&
                  task.lifetimeItems.map((el) => {
                    return (
                      <li key={el.id} className={styles.comment}>
                        {el.fieldName ? (
                          <></>
                        ) : (
                          <div className={styles.commentBlock}>
                            <div className={styles.commentBlockUser}>
                              <div className={styles.avatar}></div>
                              <div className={styles.userData}>
                                <span className={styles.userDataName}>{el.userName}</span>
                                <span className={styles.userDataDate}>
                                  {el.createdAt.split('T')[0]}
                                </span>
                              </div>
                            </div>
                            <div className={styles.commentBlockMessage}>
                              <p>{el.comment}</p>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={styles.contentTags}>
              <div className={styles.contentTagsStatus}>
                <div
                  className={styles.contentTagsStatusColor}
                  style={
                    newApplication.statusId !== task.statusId
                      ? { backgroundColor: getStatusRgbById(newApplication.statusId) }
                      : { backgroundColor: task.statusRgb }
                  }></div>
                <span
                  className={styles.contentTagsStatusText}
                  onClick={() => setVisibleStatus(!visibleStatus)}>
                  {newApplication.statusId !== task.statusId
                    ? getStatusNameById(newApplication.statusId)
                    : task.statusName}
                </span>
                <img src={pen} alt="pen" className={styles.pen} />
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
                <span className={styles.contentTagsApplicantName}>Заявитель</span>
                <span className={styles.contentTagsApplicantValue}>{task.initiatorName}</span>
              </div>
              <div className={styles.contentTagsCreated}>
                <span className={styles.contentTagsCreatedName}>Создан</span>
                <span className={styles.contentTagsCreatedValue}>
                  {task.createdAt && task.createdAt.split('T')[0].replace(/-/g, '.')}
                </span>
              </div>
              <div className={styles.contentTagsExecutor}>
                <span className={styles.contentTagsExecutorName}>Испольнитель</span>
                <span
                  onClick={() => setVisibleUsers(!visibleUser)}
                  className={styles.contentTagsExecutorValue}>
                  {newApplication.executorId !== task.executorId
                    ? getUserNameById(newApplication.executorId)
                    : task.executorName}
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
                <span className={styles.contentTagsPriorityName}>Приоритет</span>
                <span
                  onClick={() => setVisiblePriority(!visiblePriority)}
                  className={styles.contentTagsPriorityValue}>
                  {newApplication.priorityId !== task.priorityId
                    ? getPriorityNameById(newApplication.priorityId)
                    : task.priorityName}
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
                <span className={styles.contentTagsTermName}>Срок</span>
                <span className={styles.contentTagsTermValue}>
                  {task.resolutionDatePlan
                    ? task.resolutionDatePlan.split('T')[0].replace(/-/g, '.')
                    : '-'}
                </span>
              </div>
              <div className={styles.contentTagsOther}>
                <span className={styles.contentTagsOtherName}>Теги</span>
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
                  <button onClick={onChangeTags} className={styles.contentTagsEditButton}>
                    {isUpdating ? 'Изменение...' : 'Изменить'}
                  </button>
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
