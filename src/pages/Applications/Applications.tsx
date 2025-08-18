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
    <div>
      <h1>Applications</h1>
      <div className={styles.content}>
        <div className={styles.create}>
          <button className={styles.createButton} onClick={toggleCreateFormButton}>
            {isCreateFormOpen ? 'Закрыть' : 'Создать заявку'}
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>название</th>
              <th>статус</th>
              <th>испольнитель</th>
            </tr>
          </thead>
          <tbody>
            {applications?.map((el) => {
              return (
                <tr key={el.id} onClick={() => toggleEditForm(el.id)}>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.statusName}</td>
                  <td>{el.initiatorName}</td>
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
