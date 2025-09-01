import { useState } from 'react';

import styles from './ApplicationTags.module.scss';

import SelectModal from '../SelectModal/SelectModal';

import pen from '/img/pen.svg?url';
import calendar from '/img/calendar.svg?url';

import type { Task, Status, Priority, User, ModifiedApplication } from '../../@types/types';

interface ApplicationTagsProps {
  task: Task;
  newApplication: ModifiedApplication;
  setNewApplication: (updater: (prev: ModifiedApplication) => ModifiedApplication) => void;
  statuses: Status[];
  priorities: Priority[];
  users: User[];
  getStatusNameById: (id: number) => string;
  getStatusRgbById: (id: number) => string;
  getPriorityNameById: (id: number) => string;
  getUserNameById: (id: number) => string;
}

const ApplicationTags = ({
  task,
  newApplication,
  setNewApplication,
  statuses,
  priorities,
  users,
  getStatusNameById,
  getStatusRgbById,
  getPriorityNameById,
  getUserNameById,
}: ApplicationTagsProps) => {
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [visibleUser, setVisibleUsers] = useState(false);
  const [visiblePriority, setVisiblePriority] = useState(false);

  return (
    <div className={styles.contentTags}>
      {/* Status */}
      <div className={styles.contentTagsStatus}>
        <div
          className={styles.contentTagsStatusColor}
          style={{
            backgroundColor:
              newApplication.statusId !== task.statusId
                ? getStatusRgbById(newApplication.statusId)
                : task.statusRgb,
          }}
        />
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

      {/* Applicant */}
      <div className={styles.contentTagsApplicant}>
        <span className={styles.contentTagsApplicantName}>Заявитель</span>
        <span className={styles.contentTagsApplicantValue}>{task.initiatorName}</span>
      </div>

      {/* Created */}
      <div className={styles.contentTagsCreated}>
        <span className={styles.contentTagsCreatedName}>Создан</span>
        <span className={styles.contentTagsCreatedValue}>
          {task.createdAt && new Date(task.createdAt).toLocaleDateString('ru-RU')}
        </span>
      </div>

      {/* Executor */}
      <div className={styles.contentTagsExecutor}>
        <span className={styles.contentTagsExecutorName}>Исполнитель</span>
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

      {/* Priority */}
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

      {/* Term */}
      <div className={styles.contentTagsTerm}>
        <span className={styles.contentTagsTermName}>Срок</span>
        <span className={styles.contentTagsTermValue}>
          <img src={calendar} alt="calendar" className={styles.calendar} />
          {task.resolutionDatePlan
            ? new Date(task.resolutionDatePlan).toLocaleDateString('ru-RU')
            : '-'}
        </span>
      </div>

      {/* Tags */}
      <div className={styles.contentTagsOther}>
        <span className={styles.contentTagsOtherName}>Теги</span>
        <ul className={styles.tagsList}>
          {task.tags.map((tag) => (
            <li key={tag.id} className={styles.tag}>
              {tag.name.length > 20 ? `${tag.name.slice(0, 25)}...` : tag.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplicationTags;
