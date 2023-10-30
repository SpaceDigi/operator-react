import React from 'react';

export default function RedirectToEmployeeTab({
  active,
  handleRedirectToEmployeeClick,
  employeeList = [],
}) {
  return (
    <div>
      <div className={`tab-content  ${active ? 'active' : ''}`}>
        <ul className="tab-list">
          {!employeeList.length ? (
            <p>Список порожній</p>
          ) : (
            employeeList.map((workplace, index) => {
              return (
                <li key={index}>
                  <p>
                    {workplace.title}
                    <span> </span>
                  </p>
                  <button
                    type="button"
                    onClick={handleRedirectToEmployeeClick}
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
