import React from 'react';

export default function PostponedJobsTab({
  active,
  postponedTicketList = [],
  handlePostponedTicketClick,
}) {
  return (
    <div>
      <div className={`tab-content  ${active ? 'active' : ''}`}>
        <ul className="tab-list">
          {!postponedTicketList.length ? (
            <p>Список порожній</p>
          ) : (
            postponedTicketList.map((job, index) => {
              const text = `Квиток №${job.receiptNumber}/ ${job.serviceName}`;
              return (
                <li key={index}>
                  <p style={{ paddingTop: 8 }}>
                    <span
                      title={text}
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        marginRight: '3px',
                      }}
                    >
                      {text}
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
