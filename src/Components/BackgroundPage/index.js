import React from 'react';
import '../../styles/styles.css';
import { ReactComponent as Logo } from '../../img/sinevo-logo.svg';

function BackgroundPage() {
  return (
    <React.Fragment>
      <header>
        <div className="header-top">
          <div className="container">
            <a href="/" className="logo">
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
            </a>

            <div className="header-top__right">
              <div className="header-top__stat">
                <span className="ico ico-users">0</span>
                <span className="ico ico-pause">0</span>
                <span className="ico ico-fire">0</span>
              </div>
              <div className="header-top__work">
                Відділення / <strong>Місце</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container">
            <p className="client-info">
              <span>Назва послуги</span>
              <strong>-</strong>
            </p>

            <div className="header-bottom__twice">
              <p className="client-info">
                <span>Номер квитка</span>
                <strong className="ico ico-ticket">-</strong>
              </p>
              <p className="client-info">
                <span>Час</span>
                <strong className="ico ico-clock">00:00:00</strong>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="main-row">
            <div className="col-2-3">
              <div className="row-buttons">
                <div className="col-1-2">
                  <a href="/" className="btn btn-call">
                    <strong>Викликати</strong>
                    НАТИСНІТЬ ЩОБ ПОЧАТИ
                  </a>
                  <a href="/" className="btn btn-play">
                    <strong>Почати</strong>
                    ПОЧАТИ ЗАПИС
                  </a>
                </div>
                <div className="col-1-2">
                  <a href="/" className="btn btn-add">
                    <strong>Створити</strong>
                    НОВИЙ КЛІЄНТ
                  </a>

                  <a href="/" className="btn btn-stop">
                    <strong>Завершити</strong>
                    ЗАВЕРШИТИ ЗАПИС
                  </a>
                </div>
              </div>

              <div className="row-order">
                <div className="col-1-2">
                  {/* <div className="box">
                    <div className="box-title">
                      <strong>Деталі</strong>
                    </div>

                    <div className="box-content">
                      <div className="input-block">
                        <span className="input-name">Опис</span>
                        <input
                          type="text"
                          className="input"
                          placeholder="Текстове поле для заповнення..."
                        />
                      </div>
                      <div className="input-block">
                        <span className="input-name">Опис</span>
                        <input
                          type="text"
                          className="input"
                          placeholder="Текстове поле для заповнення..."
                        />
                      </div>
                      <div className="input-block">
                        <span className="input-name">Опис</span>
                        <input
                          type="text"
                          className="input"
                          placeholder="Текстове поле для заповнення..."
                        />
                      </div>
                      <div className="input-block">
                        <span className="input-name">Опис</span>
                        <input
                          type="text"
                          className="input"
                          placeholder="Текстове поле для заповнення..."
                        />
                      </div>
                      <div className="input-block">
                        <span className="input-name">Опис</span>
                        <input
                          type="text"
                          className="input"
                          placeholder="Текстове поле для заповнення..."
                        />
                      </div>
                      <div className="input-block">
                        <span className="input-name">Опис</span>
                        <input
                          type="text"
                          className="input"
                          placeholder="Текстове поле для заповнення..."
                        />
                      </div>
                      <div className="input-block">
                        <span className="input-name">Опис</span>
                        <input
                          type="text"
                          className="input"
                          placeholder="Текстове поле для заповнення..."
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="col-1-2 inverse">
                  <div className="row-buttons">
                    <div className="col-1-2">
                      <a href="/" className="btn btn-del">
                        <strong>Видалити</strong>
                        НЕМАЄ КЛІЄНТА
                      </a>
                    </div>
                    <div className="col-1-2">
                      <a href="/" className="btn btn-off">
                        <strong>Вийти</strong>
                        ЗАВЕРШИТИ СЕАНС
                      </a>
                    </div>
                  </div>
                  <div className="box">
                    <div className="box-title">
                      <strong>Відкласти</strong>
                    </div>

                    <div className="box-content">
                      <div className="input-block">
                        <button className="arr arr-down"></button>
                        <input
                          type="text"
                          className="input input-time"
                          placeholder="Час"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1-3">
              <div className="box">
                <ul className="tabs">
                  <li>Задачі</li>
                  <li className="active">Направити</li>
                  <li>Відкладені</li>
                </ul>

                <div className="tab-content">#Відкладені</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>
            © 2020 QMate Dashboard by Servus Systems Integration. All rights reserved
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default BackgroundPage;
