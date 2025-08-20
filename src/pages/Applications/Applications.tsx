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
  }, [statuses, priorities, users, dispatch]); //Внимание

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
          <button
            className={styles.createButton}
            onClick={toggleCreateFormButton}
            disabled={isLoading ? true : false}>
            {isCreateFormOpen ? 'Закрыть' : 'Создать заявку'}
          </button>
        </div>
        {isLoading ? (
          <div className="loading">
            <span className="loader"></span>
          </div>
        ) : error ? (
          <div className="error">Ошибка</div>
        ) : (
          <table className={styles.applications}>
            <thead className={styles.applicationsHead}>
              <tr className={styles.applicationsHeadTr}>
                <th className={styles.lineCell}>
                  <div className={styles.lineWhite}></div>
                </th>
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
                    <td className={styles.lineCell}>
                      <div className={styles.line}></div>
                    </td>
                    <td className={styles.id}>{el.id}</td>
                    <td className={styles.name}>
                      {el.name.length > 75 ? el.name.substring(0, 75) + '...' : el.name}
                    </td>
                    <td className={styles.status}>
                      <span className={styles.statusSpan} style={{ backgroundColor: el.statusRgb }}>
                        {el.statusName.length > 14
                          ? el.statusName.substring(0, 12) + '...'
                          : el.statusName}
                      </span>
                    </td>
                    <td className={styles.executor}>{el.executorName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
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
