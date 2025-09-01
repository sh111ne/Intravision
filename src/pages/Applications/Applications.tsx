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
import ApplicationsTable from '../../components/ApplicationsTable/ApplicationsTable';

import lens from '/img/searchicon.svg?url';
import { tenantguid } from '../../shared/constants';

const Applications = () => {
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

  const handleRowClick = (id: number) => {
    setIsCreateFormOpen(false);
    setActiveApplication(id);
  };

  const handleCloseEdit = () => {
    setActiveApplication(undefined);
  };

  useEffect(() => {
    if (isSuccess && listApplications) {
      dispatch(setApplications(listApplications));
    }
  }, [listApplications, isSuccess, dispatch]);

  useEffect(() => {
    if (statuses) dispatch(setStatuses(statuses));
    if (priorities) dispatch(setPriorities(priorities));
    if (users) dispatch(setUsers(users));
  }, [statuses, priorities, users, dispatch]);

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
          <button
            className={styles.createButton}
            onClick={toggleCreateFormButton}
            disabled={isLoading}>
            {isCreateFormOpen ? 'Закрыть' : 'Создать заявку'}
          </button>
        </div>

        <ApplicationsTable
          applications={applications}
          isLoading={isLoading}
          error={error}
          onRowClick={handleRowClick}
        />

        {isCreateFormOpen && !activeApplication && (
          <div className={styles.formContainer}>
            <CreateApplication onClose={toggleCreateForm} setActive={setActiveApplication} />
          </div>
        )}

        {activeApplication && !isCreateFormOpen && (
          <div className={styles.formContainer}>
            <EditApplication active={activeApplication} setActive={handleCloseEdit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
