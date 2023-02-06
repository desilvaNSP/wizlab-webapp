import React, { useState, useEffect } from 'react'
// Create an editable cell renderer
export const CustomCurrencyInput = ({ initialValue, updateInput, type, disable = false, fieldValidation, required = false, placeHolder="" }) => {
    let start = 0;
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)
    const [valid, setValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState("Please enter a valid input")

    const onChange = e => {
        e.stopPropagation();
        start = e.target.selectionStart;
        let val = e.target.value;
        val = val.replace(/([^0-9.]+)/, "");
        val = val.replace(/^(0|\.)/, "");
        const match = /(\d{0,7})[^.]*((?:\.\d{0,2})?)/g.exec(val);
        const value = match[1] + match[2];
        e.target.value = value;
        setValue(value)
        if (val.length > 0) {
          e.target.value = Number(value).toFixed(2);
          e.target.setSelectionRange(start, start);
          setValue(Number(value).toFixed(2))
        }
    }

    // We'll only update the external data when the input is blurred
    const onBlur = (e) => {
        fieldValidation(value, (flag, message) => {
            if (flag) {
                updateInput(value)
            }else{
                updateInput("")
            }
            setValid(flag)
            setInvalidMessage(message)
        })
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    var customInputClassName = valid ? 'custom-input' : 'custom-input validation-error'

    return (
        <div style={{textAlign:'left'}}>
            <input className={customInputClassName} value={value} onChange={onChange} onBlur={onBlur} type={type} disabled={disable} placeholder={placeHolder} />
            {!valid && <label className='validation-error-text' style={{marginLeft:'200px'}}>
                {invalidMessage}
            </label>}
            {(valid && (value == "" || value == null) && required) && <label className='required-text' style={{marginLeft:'200px'}}>
                {"Required"}
            </label>}
        </div>
    )
}