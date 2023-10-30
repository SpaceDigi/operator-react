import React from 'react';

export default function RedirectToWorkplaceTab({
  active,
  handleRedirectToWorkplaceClick,
  workplaceList = [],
}) {
  return (
    <div>
      <div className={`tab-content  ${active ? 'active' : ''}`}>
        <ul className="tab-list">
          {!workplaceList.length ? (
            <p>Список порожній</p>
          ) : (
            workplaceList.map((service, index) => {
              return (
                <li key={index} className="task-orange">
                  <p>
                    {service.title}
                    <span>{service.lengthInMinutes} хвилин</span>
                  </p>
                  <button
                    onClick={handleRedirectToWorkplaceClick}
                    className="arr arr-right"
                  ></button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
