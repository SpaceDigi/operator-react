import React from 'react';

export default function EndButton({ completeJob, disabled }) {
  return (
    <button
      disabled={disabled}
      type="submit"
      onClick={completeJob}
      className="btn-dashboard btn btn-stop"
    >
      <strong>Завершити</strong>
      ЗАВЕРШИТИ ЗАПИС
    </button>
  );
}
