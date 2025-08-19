import { useEffect, useState } from 'react';

import styles from './Applications.module.scss';

import {
  useGetPrioritiesQuery,
  useGetStatusesQuery,
  useGetTasksQuery,
  useGetUsersQuery,
} from '../../api/applicationsApi';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  setApplications,
  setPriorities,
  setStatuses,
  setUsers,
} from '../../redux/slices/applicationsSlice';

import CreateApplication from '../../components/CreateApplication/CreateApplication';
import EditApplication from '../../components/EditApplication/EditApplication';

import lens from '/img/searchicon.svg?url';

const Applications = () => {
  const tenantguid = '3c1d64a0-ace0-40ed-9901-7a20bf7f7d34';
  const { applications } = useAppSelector((state) => state.applicationsSlice);
  const dispatch = useAppDispatch();
  const { data: listApplications, error, isLoading, isSuccess } = useGetTasksQuery(tenantguid);
  const { data: statuses } = useGetStatusesQuery(tenantguid, { skip: !isSuccess });
  const { data: priorities } = useGetPrioritiesQuery(tenantguid, { skip: !isSuccess });
  const { data: users } = useGetUsersQuery(tenantguid, { skip: !isSuccess });

  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [activeApplication, setActiveApplication] = useState<number | undefined>(undefined);

  const toggleCreateForm = () => {
    setIsCreateFormOpen(!isCreateFormOpen);
  };

  const toggleCreateFormButton = () => {
    setIsCreateFormOpen(!isCreateFormOpen);
    setActiveApplication(undefined);
  };

  const toggleEditForm = (id: number) => {
    setIsCreateFormOpen(false);
    setActiveApplication(id);
  };

  useEffect(() => {
    if (isSuccess && listApplications) {
      dispatch(setApplications(listApplications));
    }
  }, [listApplications, isSuccess, dispatch]);

  useEffect(() => {
    if (statuses) {
      dispatch(setStatuses(statuses));
    }
    if (priorities) {
      dispatch(setPriorities(priorities));
    }
    if (users) {
      dispatch(setUsers(users));
    }
  }, [statuses, priorities, users, dispatch]);

  console.log(listApplications);
  console.log(activeApplication);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div className={styles.search}>
          <input type="text" className={styles.searchInput} />
          <img src={lens} alt="lens" className={styles.searchLens} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.create}>
          <button className={styles.createButton} onClick={toggleCreateFormButton}>
            {isCreateFormOpen ? 'Закрыть' : 'Создать заявку'}
          </button>
        </div>
        <table className={styles.applications}>
          <thead className={styles.applicationsHead}>
            <tr className={styles.applicationsHeadTr}>
              <th className={styles.id}>ID</th>
              <th className={styles.name}>Название</th>
              <th className={styles.status}>Статус</th>
              <th className={styles.executor}>Испольнитель</th>
            </tr>
          </thead>
          <tbody className={styles.applicationsBody}>
            {applications?.map((el) => {
              return (
                <tr
                  key={el.id}
                  onClick={() => toggleEditForm(el.id)}
                  className={styles.applicationsBodyTr}>
                  <td className={styles.id}>{el.id}</td>
                  <td className={styles.name}>{el.name}</td>
                  <td className={styles.status}>{el.statusName}</td>
                  <td className={styles.executor}>{el.executorName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isCreateFormOpen && !activeApplication && (
          <div className={styles.formContainer}>
            <CreateApplication onClose={toggleCreateForm} setActive={setActiveApplication} />
          </div>
        )}
        {activeApplication && !isCreateFormOpen && (
          <div className={styles.formContainer}>
            <EditApplication active={activeApplication} setActive={setActiveApplication} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
