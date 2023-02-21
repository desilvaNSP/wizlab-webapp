import React, { useState, useEffect } from 'react'
// Create an editable cell renderer
export const CustomInput = ({ initialValue, updateInput, type, disable = false, fieldValidation, required = false, placeHolder="" }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)
    const [valid, setValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState("Please enter a valid input")

    const onChange = e => {
        e.stopPropagation();
        setValue(e.target.value)
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
            {!valid && <label className='validation-error-text'>
                {invalidMessage}
            </label>}
            {(valid && (value == "" || value == null) && required) && <label className='required-text'>
                {"*"}
            </label>}
        </div>
    )
}