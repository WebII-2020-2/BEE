import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LogonApiService from '../../../../../services/api/LogonApiService';
import LoadingPage from '../../../../../components/Shared/LoadingPage';
import PersonalData from './PersonalData';
import Security from './Security';
import './DataUser.css';
import { updateUser } from '../../../../../services/local-storage/authUser';

function DataUser() {
  const history = useHistory();
  const [data, setData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    birth_date: '',
  });
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const getUser = async () => {
    try {
      setIsLoadingPage(true);
      const resp = await LogonApiService.getUser()
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setData(resp.data);
        updateUser();
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
      history.push('/');
    } finally {
      setIsLoadingPage(false);
    }
  };

  const editUser = async (form) => {
    try {
      setLoading(true);
      const resp = await LogonApiService.updateUser(form)
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setData(form);
        handleEdit();
        updateUser();
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoadingPage) return <LoadingPage />;

  return (
    <div className="container-dashboard">
      <PersonalData
        data={data}
        editUser={editUser}
        isReadOnly={isReadOnly}
        handleEdit={handleEdit}
        loading={loading}
      />
      <Security />
    </div>
  );
}

export default DataUser;
