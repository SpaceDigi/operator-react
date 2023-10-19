import React, { useState, useEffect } from 'react';
import API from '../../api/API';
import logoBlack from '../../img/logo-black.svg';
import BackgroundPage from '../../Components/BackgroundPage';
import links from '../../api/links';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../config';
import { setUserId } from '../../redux/auth/authSlice';

export default function Login(props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const USER_ID = useSelector((state) => state.USER_ID);
  console.log(USER_ID);

  useEffect(() => {
    document.body.className = 'fix';
    if (Boolean(USER_ID)) {
      props.history.push('/choose-data');
    }
    return () => {
      document.body.className = document.body.className.replace('fix', '');
    };
  }, [props.history, USER_ID]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!login || !password) return;
    await API.post(links.getEmployeeInfo, {
      organisationGuid: config.ORG_GUID,
      userLogin: login,
      userPassword: password,
    })
      .then((res) => {
        dispatch(setUserId(res.data.data.employeeId));
      })
      .catch((err) => {
        console.log('aasdsad', err.response);
        props.history.push({
          pathname: '/error',
          state: { error: err?.response?.data?.error?.message },
        });
      });
  };

  return (
    <React.Fragment>
      <BackgroundPage />
      <div className="pop-overlay">
        <div className="pop-table">
          <div className="pop-cell">
            <div className="pop-up" id="auth">
              <div className="pop-up-top">
                <strong>Вхід в систему</strong>
                <img src={logoBlack} alt="logo" />
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
                  <button type="submit" className="button">
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
