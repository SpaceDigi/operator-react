import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import useOutsideClick from '../../../Constants/detectOutsideClick';
import '../../../styles/styles.css';

function SelectDropdown(props) {
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  const { descriptionKey = 'description' } = props;

  useEffect(() => {
    if (props.disabled !== undefined && props.disabled !== null) {
      setDisabled(props.disabled);
    }
    if (props.required !== undefined && props.required !== null) {
      setRequired(props.required);
    }

    if (props.disabled) {
      setDropdown(false);
    }
  }, [props.disabled, props.required]);

  useOutsideClick(ref, () => {
    if (dropdown) {
      setDropdown(false);
    }
  });

  return (
    <div
      style={{
        display: 'flex',
      }}
      onClick={!disabled ? () => setDropdown(!dropdown) : null}
      onChange={!disabled ? () => setDropdown(!dropdown) : null}
      className={'input_component dropdown_component_wrapper'}
    >
      {props.title ? (
        <span style={disabled ? { color: '#C2C2C2' } : null}>
          {' '}
          {props.title.title}{' '}
        </span>
      ) : null}
      <button
        type="button"
        className="input"
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          width: '100%',
          outline: 'none',
          height: '100%',
          backgroundColor: disabled ? '' : 'transparent',
          textAlign: 'start',
          paddingRight: '50px',
        }}
      >
        <span>{props.value ? props.value[descriptionKey] : ''}</span>
        <span className="arr arr-down"></span>
      </button>
      {dropdown ? (
        <div
          style={
            props.dropdownStyle
              ? props.dropdownStyle
              : props.width
              ? { width: props.width }
              : null
          }
          className={'dropdown_component_opened'}
        >
          {props.dataList
            ? props.dataList.map((data, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => {
                      props.setVal(data);
                      setDropdown(false);
                    }}
                  >
                    {data[descriptionKey]}
                  </span>
                );
              })
            : null}
        </div>
      ) : null}
    </div>
  );
}

export default SelectDropdown;
