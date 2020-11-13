import React from "react";
import "../../styles/styles.css";
import logo from  "../../img/logo.svg";

function BackgroundPage() {
  return (
    <React.Fragment>
      <header>
        <div className="header-top">
          <div className="container">
            <a href="/" className="logo">
              <img src={logo} alt="loho" />
            </a>

            <div className="header-top__right">
              <div className="header-top__stat">
                <span className="ico ico-users">122</span>
                <span className="ico ico-pause">13</span>
                <span className="ico ico-fire">3</span>
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
              <strong>Операції із рахунком</strong>
            </p>

            <div className="header-bottom__twice">
              <p className="client-info">
                <span>Номер квитка</span>
                <strong className="ico ico-ticket">1453778</strong>
              </p>
              <p className="client-info">
                <span>Час</span>
                <strong className="ico ico-clock">00:01</strong>
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
                  <a href="/"className="btn btn-play">
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
                  <div className="box">
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
                  </div>
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

                <div className="tab-content">#Задачі</div>
                <div className="tab-content active">
                  <ul className="spec-list">
                    <li>
                      <p>
                        Іван Іванов
                        <span>Workplace</span>
                      </p>
                      <button className="arr arr-right"></button>
                    </li>
                    <li>
                      <p>
                        Сергій Сергієнко
                        <span>Workplace</span>
                      </p>
                      <button className="arr arr-right"></button>
                    </li>
                    <li>
                      <p>
                        Наталія Дмитренко
                        <span>Workplace</span>
                      </p>
                      <button className="arr arr-right"></button>
                    </li>
                    <li>
                      <p>
                        Анатолій Куц
                        <span>Workplace</span>
                      </p>
                      <button className="arr arr-right"></button>
                    </li>
                    <li>
                      <p>
                        Іван Іванов
                        <span>Workplace</span>
                      </p>
                      <button className="arr arr-right"></button>
                    </li>
                    <li>
                      <p>
                        Сергій Сергієнко
                        <span>Workplace</span>
                      </p>
                      <button className="arr arr-right"></button>
                    </li>
                    <li>
                      <p>
                        Наталія Дмитренко
                        <span>Workplace</span>
                      </p>
                      <button className="arr arr-right"></button>
                    </li>
                    <li>
                      <p>
                        Анатолій Куц
                        <span>Workplace</span>
                      </p>
                      <button className="arr arr-right"></button>
                    </li>
                    <li>
                      <p>
                        Сергій Сергієнко
                        <span>Workplace</span>
                      </p>
                      <button className="arr arr-right"></button>
                    </li>
                    <li>
                      <p>
                        Наталія Дмитренко
                        <span>Workplace</span>
                      </p>
                      <button className="arr arr-right"></button>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">#Відкладені</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>
            © 2020 QMate Dashboard by Servus Systems Integration. All rights
            reserved
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default BackgroundPage;
