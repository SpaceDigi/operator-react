import React from 'react';
import { useSelector } from 'react-redux';

export default function RedirectToWorkplaceTab({
  active,
  handleRedirectToWorkplaceClick,
  workplaceList = [],
  loading,
}) {
  const workplaceId = useSelector((state) => state.workplace).id;
  const filteredWorkplaceList = workplaceList.filter(
    (item) => item.isActive && item.workPlaceId !== workplaceId
  );

  return (
    <div>
      <div className={`tab-content  ${active ? 'active' : ''}`}>
        <ul className="tab-list">
          {!filteredWorkplaceList.length ? (
            <p>{!loading ? 'Список порожній' : ''}</p>
          ) : (
            filteredWorkplaceList.map((item, index) => {
              return (
                <li key={item.workPlaceId} className="task-orange">
                  <span
                    title={item.description}
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
