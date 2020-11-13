import React, {useEffect, useRef, useState} from 'react';
import './styles.css';
import useOutsideClick from "../../../Constants/detectOutsideClick";
import "../../../styles/styles.css";


function SelectDropdown(props) {
    const [disabled, setDisabled] = useState(false)
    const [required, setRequired] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    let ref = useRef()

    useEffect(() => {
        if (props.disabled !== undefined && props.disabled !== null) {
            setDisabled(props.disabled)
        }
        if (props.required !== undefined && props.required !== null) {
            setRequired(props.required)
        }
    }, [props.disabled, props.required])

    useOutsideClick(ref, () => {
        if (dropdown) {
            setDropdown(false)
        }
    });

    return (
        <div style={props.margin ? {margin: props.margin} : null}
             onClick={!disabled ? ()=>setDropdown(!dropdown) : null}
             onChange={!disabled ?  ()=>setDropdown(!dropdown): null}
             className={'input_component dropdown_component_wrapper'}>
            {props.title ?<span style={disabled ? {color: '#C2C2C2'} : null}> {props.title.title} </span>: null}
            <input
                ref={ref}
                style={props.width ? {width: props.width} : null}
                disabled={disabled}
                onChange={props.setVal}
                required={required}
                autoFocus={props.focus ? props.focus : false}
                placeholder={props.placeholder ? props.placeholder : null}
                className={props.error ? 'input' : 'input'}
                type={props.type ? props.type : 'text'}
                value={props.value ? props.value.title : ''}
            />
            <span className="arr arr-down"></span>
            { dropdown ?
            <div style={props.dropdownStyle ? props.dropdownStyle : props.width ? {width: props.width} : null} className={'dropdown_component_opened'}>
                {props.dataList ? props.dataList.map((data, index) => {

                    return <span
                    key={index}
                        onClick={()=> {
                            props.setVal(data)
                            setDropdown(false)
                        }}
                    >{data.title}</span>
                })
                :null}
            </div>
                :null }
        </div>
    );
}

export default SelectDropdown;
