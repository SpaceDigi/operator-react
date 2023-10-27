import React from 'react';

export default function DeleteClientButton({ deleteCustomer, disabled }) {
  return (
    <button
      disabled={disabled}
      form="detailsForm"
      onClick={deleteCustomer}
      className="btn btn-del btn-dashboard"
    >
      <strong>Видалити</strong>
      НЕМАЄ КЛІЄНТА
    </button>
  );
}
