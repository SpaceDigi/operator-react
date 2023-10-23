import React, { useEffect } from 'react';
import BackgroundPage from '../../Components/BackgroundPage';
import logoBlack from '../../img/logo-black.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setError } from '../../redux/auth/authSlice';
import { routes } from '../../api/routes';

function Error(props) {
  useEffect(() => {
    document.body.className = 'fix';
    return () => (document.body.className = '');
  }, []);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  return (
    <React.Fragment>
      <BackgroundPage />
      <div className="pop-overlay">
        <div className="pop-table">
          <div className="pop-cell">
            <div className="pop-up" id="add">
              <div className="pop-up-top">
                <strong>Помилка {props?.location?.state?.requestId} !</strong>
                <img src={logoBlack} alt="logo" />
              </div>
              <div className="form">
                <p style={{ marginBottom: 20 }}>
                  {error
                    ? error
                    : props?.location?.state?.status === 500 ||
                      props?.location?.state?.status === 502
                    ? 'Проблеми з  сервером!'
                    : "Проблеми з зв'язком!"}
                </p>
                <button
                  className="button"
                  onClick={() => {
                    dispatch(logout());
                    dispatch(setError(null));
                    props.history.push(routes.login);
                  }}
                >
                  ОК
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Error;
