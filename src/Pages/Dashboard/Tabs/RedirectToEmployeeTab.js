import React from 'react';
import { useSelector } from 'react-redux';

export default function RedirectToEmployeeTab({
  active,
  handleRedirectToEmployeeClick,
  employeeList = [],
}) {
  const employeeId = useSelector((state) => state.USER_ID);
  const filteredEmployeeList = employeeList.filter(
    (item) => item.isActive && item.employeeId !== employeeId
  );

  return (
    <div>
      <div className={`tab-content  ${active ? 'active' : ''}`}>
        <ul className="tab-list">
          {!filteredEmployeeList.length ? (
            <p>Список порожній</p>
          ) : (
            filteredEmployeeList.map((item, index) => {
              return (
                <li key={item.employeeId}>
                  <p
                    title={item.description}
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
