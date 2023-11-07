import React, { useState, useEffect } from 'react';
import BackgroundPage from '../../Components/BackgroundPage';
import API from '../../api/API';
import logo from '../../img/sinevo-logo.svg';
import SelectDropdown from '../../Components/CustomComponents/SelectDropdown';
import links from '../../api/links';
import { useSelector } from 'react-redux';
import { routes } from '../../api/routes';

export default function CreateClient(props) {
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState({
    description: 'Виберіть мову',
  });
  const [selectedCustomerType, setSelectedCustomerType] = useState({
    description: 'Виберіть тип клієнта',
  });
  const [selectedService, setSelectedService] = useState({
    serviceName: 'Виберіть тип послуги',
  });

  const serviceCenterId = useSelector((state) => state.serviceCenter.id);
  const workplaceId = useSelector((state) => state.workplace.id);
  const organisationGuid = useSelector((state) => state.orgGuid);

  const apiQueryParams = `organisationGuid=${organisationGuid}&serviceCenterId=${serviceCenterId}&workplaceId=${workplaceId}`;

  const getCustomerTypes = async () => {
    await API.get(`${links.getCustomerTypes}?${apiQueryParams}`).then((res) => {
      setCustomerTypes(res.data.data);
    });
  };

  const getLanguages = async () => {
    await API.get(`${links.getLanguages}?${apiQueryParams}`).then((res) => {
      setLanguages(res.data.data);
    });
  };

  const getServices = async () => {
    await API.get(`${links.getJobs}?${apiQueryParams}`).then((res) => {
      setServices(res.data.data);
    });
  };

  const getQueueState = async () => {
    await API.get(`${links.getQueueState}?${apiQueryParams}`);
  };

  const getData = async () => {
    setLoading(true);
    await getCustomerTypes();
    await getServices();
    await getLanguages();
    setLoading(false);
  };

  useEffect(() => {
    document.body.className = 'fix';

    getData();

    const interval = setInterval(getQueueState, 1000 * 50);
    return () => {
      clearInterval(interval);
      document.body.className = document.body.className.replace('fix', '');
    };
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await API.put(links.createClient, {
      organisationGuid,
      workplaceId,
      serviceCenterId,
      customerTypeId: selectedCustomerType.id,
      languageId: selectedLanguage.languageId,
      serviceId: selectedService.serviceId,
      phone: '',
      email: '',
      name: '',
      info: '',
      documentNum: '',
    }).then((res) => {
      if (res.data.data.jobGuid) {
        props.history.push(routes.dashboard);
      }
    });
  };

  const buttonIsDisabled =
    selectedLanguage.languageId === undefined ||
    selectedCustomerType.id === undefined ||
    selectedService.serviceId === undefined;

  return (
    <React.Fragment>
      <BackgroundPage />
      <div className="pop-overlay">
        <div className="pop-table">
          <div className="pop-cell">
            <div className="pop-up" id="add">
              <div className="pop-up-top">
                <strong>Створити</strong>
                {loading && <div className="loader-black">Loading...</div>}
                <img src={logo} alt="logo" width={75} />
              </div>
              <form onSubmit={(event) => handleSubmit(event)} className="form">
                <p className="form-title">НОВИЙ КЛІЄНТ</p>
                <div className="input-block">
                  <SelectDropdown
                    value={selectedCustomerType}
                    setVal={(e) => setSelectedCustomerType(e)}
                    dataList={customerTypes}
                  />
                </div>
                <div className="input-block">
                  <SelectDropdown
                    value={selectedService}
                    setVal={(e) => setSelectedService(e)}
                    dataList={services}
                    descriptionKey="serviceName"
                  />
                </div>
                <div className="input-block">
                  <SelectDropdown
                    value={selectedLanguage}
                    setVal={(e) => setSelectedLanguage(e)}
                    dataList={languages}
                  />
                </div>

                <div className="input-block">
                  <button
                    type="submit"
                    disabled={buttonIsDisabled}
                    className="button"
                  >
                    Підтвердити
                  </button>
                  <span
                    onClick={() => props.history.push('/dashboard')}
                    className="button__logout "
                  >
                    Відмінити
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
