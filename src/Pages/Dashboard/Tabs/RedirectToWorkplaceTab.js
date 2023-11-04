import React from 'react';

export default function RedirectToWorkplaceTab({
  active,
  handleRedirectToWorkplaceClick,
  workplaceList = [],
}) {
  console.log(workplaceList);

  const filteredWorkplaceList = workplaceList.filter((item) => item.isActive);

  return (
    <div>
      <div className={`tab-content  ${active ? 'active' : ''}`}>
        <ul className="tab-list">
          {!workplaceList.length ? (
            <p>Список порожній</p>
          ) : (
            filteredWorkplaceList.map((item, index) => {
              return (
                <li key={index} className="task-orange">
                  <span
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.description}
                  </span>

                  <button
                    data-id={item.workPlaceId}
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
