import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonsListAdmin from '../../../../components/Admin/ButtonsList';
import LoadingPageAdmin from '../../../../components/Shared/LoadingPage';
import TableListAdmin from '../../../../components/Admin/TableList';
import PaginationAdmin from '../../../../components/Shared/Pagination';
import AdminContainer from '../../../../components/Admin/Container';
import CampaignApiService from '../../../../services/api/CampaignApiService';

export default function CampaignList(props) {
  const { match } = props;
  const history = useHistory();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [valueSearch, setValueSearch] = useState();
  const [actualPage, setActualPage] = useState(1);

  const th = {
    id: 'ID',
    title: 'Nome',
    active: 'Status',
  };

  const getCampaigns = async () => {
    try {
      setIsLoading(true);
      const resp = await CampaignApiService.getAll()
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data;
        });

      if (resp.success) {
        setCampaigns(
          resp.data.map((c) => ({
            id: c.id,
            title: c.title,
            active: c.active === 1 ? 'Ativa' : 'Inativa',
          }))
        );
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const campaignsFilter = useMemo(() => {
    const filter = valueSearch || undefined;
    if (filter) {
      return campaigns.filter(
        (campaign) => campaign.name.toLowerCase().indexOf(filter) !== -1
      );
    }
    return -1;
  }, [valueSearch]);

  const totalPages = useMemo(() => {
    if (campaignsFilter !== -1) {
      return Math.ceil(campaignsFilter.length / 5);
    }
    return Math.ceil(campaigns.length / 5);
  }, [campaigns, campaignsFilter]);

  const campaignsPerPage = useMemo(() => {
    const indexMin = (actualPage - 1) * 5;
    const indexMax = indexMin + 5;
    if (campaignsFilter !== -1) {
      return campaignsFilter.filter(
        (x, index) => index >= indexMin && index < indexMax
      );
    }
    return campaigns.filter(
      (x, index) => index >= indexMin && index < indexMax
    );
  }, [actualPage, campaignsFilter, campaigns]);

  useEffect(() => {
    const page = Number(match.params.number);
    if (page) {
      setActualPage(page);
    } else {
      history.push('/admin/campanhas/page/1');
    }
    getCampaigns();
  }, []);

  return (
    <AdminContainer link="campanhas">
      <ButtonsListAdmin
        link="/admin/campanhas/novo"
        funcFilter={setValueSearch}
      />
      {isLoading ? (
        <LoadingPageAdmin />
      ) : (
        <TableListAdmin
          itens={campaignsPerPage}
          tableHead={th}
          linkEdit="/admin/campanhas"
        />
      )}
      <PaginationAdmin
        totalPages={totalPages}
        actualPage={actualPage}
        changePage={setActualPage}
        baseUrl="/admin/campanhas"
      />
    </AdminContainer>
  );
}
