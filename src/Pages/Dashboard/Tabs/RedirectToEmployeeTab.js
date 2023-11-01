import React from 'react';

export default function RedirectToEmployeeTab({
  active,
  handleRedirectToEmployeeClick,
  employeeList = [],
}) {
  const filteredEmployeeList = employeeList.filter((item) => item.isActive);

  return (
    <div>
      <div className={`tab-content  ${active ? 'active' : ''}`}>
        <ul className="tab-list">
          {!employeeList.length ? (
            <p>Список порожній</p>
          ) : (
            filteredEmployeeList.map((item, index) => {
              return (
                <li key={item.employeeId}>
                  <p>
                    {item.description}
                    <span> </span>
                  </p>
                  <button
                    type="button"
                    onClick={handleRedirectToEmployeeClick}
                    className="arr arr-right"
                    data-id={item.employeeId}
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
