import { useRef } from 'react';

import type { SelectModalProps } from '../../@types/types';

import styles from './SelectModal.module.scss';

const SelectModal = ({ obj, setNewApplication, name, setVisible }: SelectModalProps) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const onChange = (value: number) => {
    if (name === 'Статус') {
      setNewApplication((prev) => ({
        ...prev,
        statusId: value,
      }));
      setVisible(false);
    }
    if (name === 'Приоритет') {
      setNewApplication((prev) => ({
        ...prev,
        priorityId: value,
      }));
      setVisible(false);
    }
    if (name === 'Исполнитель') {
      setNewApplication((prev) => ({
        ...prev,
        executorId: value,
      }));
      setVisible(false);
    }
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setVisible(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClickOutside}>
      <div
        className={styles.modal}
        ref={selectRef}
        // style={name === 'Статус' ? { marginTop: 30 } : {}}
        onClick={(e) => e.stopPropagation()}>
        <ul className={styles.modalList}>
          {obj.map((el) => {
            return (
              <li key={el.id} onClick={() => onChange(el.id)} className={styles.modalListEl}>
                {el.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SelectModal;
