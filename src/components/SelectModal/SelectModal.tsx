import type { SelectModalProps } from '../../@types/types';

const SelectModal = ({ obj, setNewApplication, name, setVisible }: SelectModalProps) => {
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

  return (
    <div>
      <ul>
        {obj.map((el) => {
          return (
            <li key={el.id} onClick={() => onChange(el.id)}>
              {el.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectModal;
