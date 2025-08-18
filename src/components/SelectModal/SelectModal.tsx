import type { SelectModalProps } from '../../@types/types';

const SelectModal = ({ obj }: SelectModalProps) => {
  return (
    <div>
      <ul>
        {obj.map((el) => {
          return <li key={el.id}>{el.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default SelectModal;
