import React from 'react';

export default function DelayBlock() {
  return (
    <div className="box">
      <div className="box-title">
        <strong>Відкласти</strong>
      </div>

      <div className="box-content">
        <div className="input-block">
          <button
            disabled={
              this.state.operatorStatus === 'TICKET_IN_PROGRESS' ? false : true
            }
            onClick={() =>
              this.setState({
                dropDownBlock: !this.state.dropDownBlock,
              })
            }
            className="arr arr-down"
          ></button>
          <input
            type="text"
            className="input input-time"
            placeholder="Час"
            disabled
            value={`${
              this.state.hours < 10 ? '0' + this.state.hours : this.state.hours
            } : ${
              this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes
            }`}
          />
          {this.state.dropDownBlock && (
            <div className="timer-box">
              <div className="timer-inputs">
                <div className="timer-input">
                  <button
                    onClick={() => this.renderHours('increase')}
                    className="increase"
                  ></button>
                  <input
                    type="number"
                    className="nums"
                    disabled
                    value={
                      this.state.hours < 10
                        ? '0' + this.state.hours
                        : this.state.hours
                    }
                  />
                  <button
                    onClick={() => this.renderHours('decrease')}
                    className="decrease"
                  ></button>
                </div>
                <span>:</span>
                <div className="timer-input">
                  <button
                    onClick={() => this.renderMinutes('increase')}
                    className="increase"
                  ></button>
                  <input
                    type="number"
                    className="nums"
                    disabled
                    value={
                      this.state.minutes < 10
                        ? '0' + this.state.minutes
                        : this.state.minutes
                    }
                  />
                  <button
                    onClick={() => this.renderMinutes('decrease')}
                    className="decrease"
                  ></button>
                </div>
              </div>

              <div className="timer-buttons">
                <button
                  // onClick={() =>
                  //   this.postponForWhile(
                  //     this.state.hours,
                  //     this.state.minutes
                  //   )
                  // }
                  onClick={() => this.setState({ fieldStatus: 4 })}
                  form="detailsForm"
                  type="submit"
                  className="button"
                >
                  Підтвердити
                </button>
                <button
                  onClick={() => this.setState({ hours: 0, minutes: 0 })}
                  type="submit"
                  className="button reset"
                >
                  Очистити
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
