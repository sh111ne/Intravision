import styles from './ApplicationHeader.module.scss';
import close from '/img/close.svg?url';
import type { Task } from '../../@types/types';

interface ApplicationHeaderProps {
  task: Task;
  onClose: () => void;
}

const ApplicationHeader = ({ task, onClose }: ApplicationHeaderProps) => {
  const formatId = (id: number): string => {
    const str = id.toString();
    return str.length > 3 ? `${str.slice(0, 2)} ${str.slice(2)}` : str;
  };

  return (
    <div className={styles.title}>
      <div className={styles.titleText}>
        <span className={styles.titleTextId}>№ {formatId(task.id)}</span>
        <span className={styles.titleTextName}>
          {task.name.length > 135 ? `${task.name.substring(0, 132)}...` : task.name}
        </span>
      </div>
      <img src={close} alt="close" onClick={onClose} className={styles.titleClose} />
    </div>
  );
};

export default ApplicationHeader;
