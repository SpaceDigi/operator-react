import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { routes } from '../../api/routes';

export default function CreateButton({ disabled }) {
  const history = useHistory();
  return (
    <button
      disabled={disabled}
      onClick={() => history.push(routes.createClient)}
      className="btn-dashboard btn btn-add"
    >
      <strong>Створити</strong>
      НОВИЙ КЛІЄНТ
    </button>
  );
}
