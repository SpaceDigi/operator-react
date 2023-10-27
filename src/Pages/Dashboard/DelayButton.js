import React from 'react';

export default function DelayButton({ disabled, suspendJob }) {
  return (
    <button
      disabled={disabled}
      form="detailsForm"
      // onClick={() => this.ticketPostpone()}
      onClick={suspendJob}
      className="btn btn-off btn-dashboard"
    >
      <strong>Відкласти</strong>
      ВІДКЛАСТИ ТАЛОНЧИК
    </button>
  );
}
