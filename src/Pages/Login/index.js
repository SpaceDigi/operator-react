import React, { useState, useEffect, useCallback } from 'react';
import API from '../../api/API';
import logo from '../../img/sinevo-logo.svg';
import BackgroundPage from '../../Components/BackgroundPage';
import links from '../../api/links';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../config';
import {
  setOrgGuid as setReduxOrgGuid,
  setOrgName as setReduxOrgName,
  setUserId,
} from '../../redux/auth/authSlice';
import { routes } from '../../api/routes';
import debounce from 'lodash.debounce';
import Axios from 'axios';

export default function Login(props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);
  const [orgGuid, setOrgGuid] = useState('');

  const dispatch = useDispatch();
  const USER_ID = useSelector((state) => state.USER_ID);
  const serviceCenterId = useSelector((state) => state.serviceCenter.id);
  const workplaceId = useSelector((state) => state.workplace.id);
  const prevOrgName = useSelector((state) => state.orgName);

  useEffect(() => {
    if (prevOrgName) {
      setLoading(true);
      setOrgName(prevOrgName);
      debouncedGetOrgGuid(prevOrgName);
    }
    document.body.className = 'fix';
    if (USER_ID && serviceCenterId && workplaceId) {
      props.history.push(routes.dashboard);
    }

    return () => {
      document.body.className = document.body.className.replace('fix', '');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history, USER_ID, serviceCenterId, workplaceId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!login || !password) {
      return;
    }
    await API.post(links.getEmployeeInfo, {
      organisationGuid: config.ORG_GUID,
      userLogin: login,
      userPassword: password,
    }).then((res) => {
      dispatch(setUserId(res.data.data.employeeId));
      dispatch(setReduxOrgGuid(orgGuid));
      dispatch(setReduxOrgName(orgName));
      props.history.push({
        pathname: routes.chooseData,
        state: {
          userLogin: login,
          userPassword: password,
        },
      });
    });
  };

  const debouncedGetOrgGuid = debounce(async (value) => {
    if (value) {
      await Axios.get(
        `${config.API_URL}${links.getOrgGuidByName}?OrganisationName=${value}`
      )
        .then((res) => {
          console.log('org name', res.data);
          setOrgGuid(res.data.data.organisationGuid);
        })
        .catch((err) => {
          console.log(err);
          setOrgGuid('');
        });
    } else {
      setOrgGuid('');
    }
    setLoading(false);
  }, 300);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOrgGuid = useCallback((value) => debouncedGetOrgGuid(value), []);

  const handleOrgNameChange = (e) => {
    const { value } = e.target;
    setLoading(true);
    setOrgName(value);
    getOrgGuid(value);
  };

  const showOrgNameError = !orgGuid && orgName && !loading;

  return (
    <React.Fragment>
      <BackgroundPage />
      <div className="pop-overlay">
        <div className="pop-table">
          <div className="pop-cell">
            <div className="pop-up" id="auth">
              <div className="pop-up-top">
                <strong>Вхід в систему</strong>
                <img src={logo} width={75} alt="logo" />
              </div>
              <form onSubmit={(event) => handleSubmit(event)} className="form">
                <p className="form-title">ВВЕДІТЬ ВАШІ ДАНІ</p>
                <div className="input-block">
                  <span className="input-name">Логін</span>
                  <input
                    autoComplete="on"
                    name="login"
                    className="input"
                    type="text"
                    placeholder="Логін"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                  />
                </div>
                <div className="input-block">
                  <span className="input-name">Пароль</span>
                  <input
                    autoComplete="on"
                    name="password"
                    type="password"
                    className="input"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-block">
                  <span className="input-name">Назва організації</span>
                  <input
                    autoComplete="on"
                    name="orgName"
                    type="text"
                    className="input"
                    placeholder="Назва організації"
                    value={orgName}
                    onChange={handleOrgNameChange}
                    required
                  />
                  {showOrgNameError ? (
                    <span className="error-msg">
                      Організації з таким ім'ям не існує.
                    </span>
                  ) : null}
                </div>
                <div className="input-block">
                  <button
                    type="submit"
                    className="button"
                    disabled={!orgGuid || loading}
                  >
                    Підтвердити
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
