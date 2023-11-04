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
                  <p
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      marginRight: '3px',
                    }}
                  >
                    {item.description}
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
