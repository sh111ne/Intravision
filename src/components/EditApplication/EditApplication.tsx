import { useEffect, useState } from 'react';
import {
  useGetOneTaskQuery,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from '../../api/applicationsApi';
import { useAppSelector } from '../../redux/store';

import styles from './EditApplication.module.scss';

import ApplicationHeader from '../ApplicationHeader/ApplicationHeader';
import ApplicationTags from '../ApplicationTags/ApplicationTags';
import CommentItem from '../CommentItem/CommentItem';
import CreateComment from '../CreateComment/CreateComment';

import type { ModifiedApplication } from '../../@types/types';
import { tenantguid } from '../../shared/constants';

interface EditApplicationProps {
  active: number;
  setActive: (id: number | undefined) => void;
}

const EditApplication = ({ active, setActive }: EditApplicationProps) => {
  const {
    data: task,
    isLoading,
    error,
    refetch: refetchOneTask,
  } = useGetOneTaskQuery({ tenantguid, id: active }, { refetchOnMountOrArgChange: true });

  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const { refetch: refetchTasks } = useGetTasksQuery(tenantguid);
  const { statuses, priorities, users } = useAppSelector((state) => state.applicationsSlice);

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

  const getStatusNameById = (statusId: number) =>
    statuses.find((s) => s.id === statusId)?.name || 'Неизвестный статус';

  const getStatusRgbById = (statusId: number) => statuses.find((s) => s.id === statusId)?.rgb || '';

  const getPriorityNameById = (priorityId: number) =>
    priorities.find((p) => p.id === priorityId)?.name || 'Неизвестный приоритет';

  const getUserNameById = (userId: number) =>
    users.find((u) => u.id === userId)?.name || 'Не назначен';

  const onChangeTags = async () => {
    if (!task) return;

    try {
      await updateTask({ tenantguid, taskData: newApplication }).unwrap();
      setNewApplication((prev) => ({ ...prev, comment: '' }));
      refetchTasks();
      refetchOneTask();
    } catch (err) {
      console.error('Ошибка при обновлении заявки:', err);
    }
  };

  const hasNoChanges = () => {
    if (!task) return true;
    return (
      newApplication.statusId === task.statusId &&
      newApplication.priorityId === task.priorityId &&
      newApplication.executorId === task.executorId &&
      newApplication.comment === ''
    );
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

  if (isLoading)
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  if (error)
    return (
      <div className={styles.errorBlock}>
        <span>Ошибка загрузки заявки</span>
      </div>
    );
  if (!task) return <div>Заявка не найдена</div>;

  return (
    <div className={styles.editBlock}>
      <ApplicationHeader task={task} onClose={() => setActive(undefined)} />

      <div className={styles.content}>
        <div className={styles.contentText}>
          <div className={styles.contentTextDesc}>
            <span>Описание</span>
            <p>{task.description}</p>
          </div>

          <CreateComment newApplication={newApplication} setNewApplication={setNewApplication} />

          <div className={styles.contentTagsEdit}>
            <button
              onClick={onChangeTags}
              className={styles.contentTagsEditButton}
              disabled={isUpdating || hasNoChanges()}>
              {isUpdating ? 'Сохранение' : 'Сохранить'}
            </button>
          </div>

          <ul className={styles.contentTextCommList}>
            {task.lifetimeItems
              ?.filter((item) => !item.fieldName)
              .map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
          </ul>
        </div>

        <ApplicationTags
          task={task}
          newApplication={newApplication}
          setNewApplication={setNewApplication}
          statuses={statuses}
          priorities={priorities}
          users={users}
          getStatusNameById={getStatusNameById}
          getStatusRgbById={getStatusRgbById}
          getPriorityNameById={getPriorityNameById}
          getUserNameById={getUserNameById}
        />
      </div>
    </div>
  );
};

export default EditApplication;
