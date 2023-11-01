import React from 'react';
import { ReactComponent as Logo } from '../../img/sinevo-logo.svg';
// import sinevoLogoSm from '../../img/sinevo-logo-sm.svg';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function Header({
  time = 0,
  soundRecordStatus = '',
  commonTicketListSize = 0,
  directTicketListSize = 0,
  postponedTicketListSize = 0,

  logout,
  logoutIsDisabled = false,
  loading = false,
  serviceTitle,
  numTicket,
}) {
  const workplace = useSelector((state) => state.workplace);
  const serviceCenter = useSelector((state) => state.serviceCenter);

  return (
    <header>
      <div className="header-top">
        <div className="container">
          <a
            href="/"
            className="logo"
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'white',
            }}
          >
            <Logo
              fill="#FFFFFF"
              style={{
                marginTop: '5px',
                height: '25px',
              }}
            />
          </a>

          <div className="header-top__right">
            {soundRecordStatus && (
              <div style={{ marginTop: 8 }}>
                <p style={{ color: 'red' }}>Проблеми з записом звуку!</p>
              </div>
            )}
            {loading && <div className="loader">Loading...</div>}
            <div className="header-top__stat">
              <span className="ico ico-users">{commonTicketListSize}</span>
              <span className="ico ico-pause">{postponedTicketListSize}</span>
              <span className="ico ico-fire">{directTicketListSize}</span>
            </div>
            <div className="header-top__work">
              {serviceCenter.title} / <strong>{workplace.title}</strong>
            </div>
            <div className="header-top__logout">
              <button
                disabled={logoutIsDisabled}
                onClick={logout}
                className="header-logout"
              >
                Вийти
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <p className="client-info">
            <span>Назва послуги</span>
            <strong>{serviceTitle}</strong>
          </p>

          <div className="header-bottom__twice">
            <p className="client-info">
              <span>Номер квитка</span>
              <strong className="ico ico-ticket">{numTicket}</strong>
            </p>
            <p className="client-info">
              <span>Час</span>
              <strong className="ico ico-clock">
                {moment.utc(time).format('HH:mm:ss')}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
