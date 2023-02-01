import React, { useState, useEffect } from 'react'

export const CustomCheckBox = ({ initialValue = false, updateInput, type, disable = false, required = false }) => {

    const [value, setValue] = useState(initialValue)

    const onChange = e => {
        e.stopPropagation();
        setValue(e.target.checked)
    }

    const onBlur = (e) => {
        updateInput(value)
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <div style={{ textAlign: 'left' }}>
            <input className='custom-input custom-checkbox' checked={value} onChange={onChange} onBlur={onBlur} type="checkbox" />
        </div>
    )
}