import React from 'react';

export default function PostponedJobsTab({
  active,
  postponedTicketList = [],
  handlePostponedTicketClick,
}) {
  console.log(postponedTicketList);
  return (
    <div>
      <div className={`tab-content  ${active ? 'active' : ''}`}>
        <ul className="tab-list">
          {!postponedTicketList.length ? (
            <p>Список порожній</p>
          ) : (
            postponedTicketList.map((job, index) => {
              return (
                <li key={index}>
                  <p style={{ paddingTop: 8 }}>
                    <span
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        marginRight: '3px',
                      }}
                    >
                      Квиток №{job.receiptNumber}/ {job.serviceName}
                    </span>
                  </p>
                  <button
                    data-id={job.jobGuid}
                    onClick={handlePostponedTicketClick}
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
