import React from 'react';

export default function Details() {
  return (
    <div className="box">
      <div className="box-title">
        <strong>Деталі</strong>
      </div>
      <div className="box-content">
        {this.state.fieldList
          .filter((field) => field.entityType === 'TICKET')
          .map((field, index) => {
            return (
              <div key={index} className="input-block">
                <span className="input-name">{field.name}</span>
                <input
                  type="text"
                  disabled
                  value={field.value}
                  name={field.name}
                  className="input"
                  placeholder={field.name}
                />
              </div>
            );
          })}

        <form
          onSubmit={(event) => {
            this.state.operatorStatus === 'INTERNAL_TRANSACTION_STARTED'
              ? this.internalOperationFinish(event)
              : this.state.fieldStatus === 1
              ? this.ticketFinish(event)
              : this.state.fieldStatus === 2
              ? this.ticketPostpone(event)
              : this.state.fieldStatus === 3
              ? this.ticketDelete(event)
              : this.state.fieldStatus === 4
              ? this.postponForWhile(this.state.hours, this.state.minutes, event)
              : this.state.fieldStatus === 5 &&
                this.ticketRedirect(this.state.workplaceId, event);
          }}
          id="detailsForm"
          className="form"
        >
          {this.state.fieldList
            .filter((field) => field.entityType === 'TRANSACTION')
            .map((field, index) => {
              return (
                <div key={index} className="input-block">
                  <span className="input-name">{field.name}</span>
                  <input
                    type="text"
                    value={field.value ? field.value : ''}
                    onChange={(text) => this.onChangeField(text, index)}
                    name={field.name}
                    className="input"
                    placeholder={field.name}
                  />
                </div>
              );
            })}
        </form>
      </div>
    </div>
  );
}
