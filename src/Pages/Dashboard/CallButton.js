import React from 'react';

export default function CallButton({ callTicket, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={callTicket}
      className="btn-dashboard btn btn-call"
    >
      <strong>Викликати</strong>
      НАТИСНІТЬ ЩОБ ПОЧАТИ
    </button>
  );
}
