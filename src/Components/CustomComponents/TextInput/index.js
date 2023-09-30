import React, {useEffect, useState} from 'react';
import './styles.css';

function TextInput(props) {
    const [disabled, setDisabled] = useState(false)
    const [required, setRequired] = useState(false)

    useEffect(() => {
        if (props.disabled !== undefined && props.disabled !== null) {
            setDisabled(props.disabled)
        }
        if (props.required !== undefined && props.required !== null) {
            setRequired(props.required)
        }
    }, [props.disabled, props.required])

    return (
        <div style={props.margin ? {margin: props.margin} : null} className={'input_component'}>
            <span style={disabled ? {color: '#C2C2C2'} : null}>{props.title ? props.title : ''}</span>
            <input
                style={props.style ? props.style : props.width ? {width: `${props.width}`} : null}
                disabled={disabled}
                required={required}
                id={props.id ? props.id : null}
                name={props.name ? props.name : ''}
                autoFocus={props.focus ? props.focus : false}
                placeholder={props.placeholder ? props.placeholder : null}
                className={props.error ? 'error custom_input' : 'custom_input'}
                type={props.type ? props.type : 'text'}
                value={props.value ? props.value : ''}
                onChange={props.onchange ? e => {
                    props.onchange(e)
                } : null}
                />
        </div>
    );
}

export default TextInput;
