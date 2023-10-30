import React from 'react';
import { postponedTabDisabledStatuses, tabsValues } from '../constants';

export default function TabsHead({ activeTab, setActiveTab, workplaceState }) {
  const tasksTabDisabled = false;
  const sendTabDisabled = false;
  const delayedTabDisabled = postponedTabDisabledStatuses.includes(workplaceState);

  return (
    <ul className={`${activeTab !== 0 ? 'tabs' : 'tabs-none'}`}>
      <button
        className={`${
          activeTab === tabsValues.REDIRECT_TO_EMPLOYEE ? 'active' : ''
        }`}
        onClick={() => setActiveTab(tabsValues.REDIRECT_TO_EMPLOYEE)}
        disabled={tasksTabDisabled}
      >
        Cпівробітники
      </button>
      <button
        className={`${
          activeTab === tabsValues.REDIRECT_TO_WORKPLACE ? 'active' : ''
        }`}
        onClick={() => setActiveTab(tabsValues.REDIRECT_TO_WORKPLACE)}
        disabled={sendTabDisabled}
      >
        Робочі місця
      </button>
      <button
        className={`${activeTab === tabsValues.POSTPONED ? 'active' : ''}`}
        onClick={() => setActiveTab(tabsValues.POSTPONED)}
        disabled={delayedTabDisabled}
      >
        Відкладені
      </button>
    </ul>
  );
}
