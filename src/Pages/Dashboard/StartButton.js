import React from 'react';

export default function StartButton({ disabled, ticketStart }) {
  return (
    <button
      disabled={disabled}
      onClick={ticketStart}
      className="btn-dashboard btn btn-play"
    >
      <strong>Почати</strong>
      ПОЧАТИ ЗАПИС
    </button>
  );
}
