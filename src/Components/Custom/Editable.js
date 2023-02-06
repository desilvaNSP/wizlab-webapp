import React, { useState, useEffect } from 'react'
import DropdownInputCell from './DropdownInputCell'

// Create an editable cell renderer
export const EditableInputTextCell = ({
    initialValue,
    row: { index, original, id },
    columnId,
    updateMyData,
    isLink = false,
    linkClickEvent,
    dbUpdate = true,
    dbAdd = true,
    type = "text",
    placeholderText = ""
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    const onChange = e => {
        e.stopPropagation();
        var targetValue = e.target.value
        setValue(targetValue)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = (e) => {
        e.stopPropagation();
        if (value !== initialValue) {
            updateMyData(index, columnId, value, id)
        }
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return ((original.new && original.new == true) || dbUpdate) && dbAdd ?
        <input className='editable-input--cell' value={value} onChange={onChange} onBlur={onBlur} type={type} min="1" max="20" placeholder={placeholderText} />
        : isLink ?
            <a className="datatable--link" onClick={() => linkClickEvent(original, index)}>{value}</a>
            : <span>{value}</span>
}

// Create an editable cell renderer
export const EditableInputCurrencyCell = ({
    initialValue,
    row: { index, original, id },
    columnId,
    updateMyData,
    isLink = false,
    linkClickEvent,
    dbUpdate = true,
    dbAdd = true,
    type = "text",
    placeholderText = ""
}) => {
    // We need to keep and update the state of the cell normally
    let start = 0;
    const [value, setValue] = useState(initialValue)

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
        e.stopPropagation();
        if (value !== initialValue) {
            updateMyData(index, columnId, value, id)
        }
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return ((original.new && original.new == true) || dbUpdate) && dbAdd ?
        <input className='editable-input--cell' value={value} onChange={onChange} onBlur={onBlur} type={type} min="1" max="20" placeholder={placeholderText} />
        : isLink ?
            <a className="datatable--link" onClick={() => linkClickEvent(original, index)}>{value}</a>
            : <span>{value}</span>
}

// Create an editable cell renderer
export const EditableCheckBoxCell = ({
    initialValue,
    row: { index, original, id },
    columnId,
    updateMyData
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    const onChange = e => {
        e.stopPropagation();
        var targetValue = e.target.checked
        console.log(targetValue)
        setValue(targetValue)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = (e) => {
        e.stopPropagation();
        if (value !== initialValue) {
            updateMyData(index, columnId, value, id)
        }
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input className='custom-input custom-checkbox' checked={value} onChange={onChange} onBlur={onBlur} type="checkbox" />
}

export const EditableInputNumberCell = ({
    initialValue,
    row: { index, original, id },
    columnId,
    updateMyData,
    isLink = false,
    linkClickEvent,
    dbUpdate = true,
    dbAdd = true,
    max,
    min = 0
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    const onChange = e => {
        e.stopPropagation();
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = (e) => {
        e.stopPropagation();
        if (value !== initialValue) {
            updateMyData(index, columnId, value, id)
        }
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return ((original.new && original.new == true) || dbUpdate) && dbAdd ?
        <input className='editable-input--cell' value={value} onChange={onChange} onBlur={onBlur} type="number" min={min} max={max} />
        : isLink ?
            <a className="datatable--link" onClick={() => linkClickEvent(original, index)}>{value}</a>
            : <span>{value}</span>
}

// Create an editable cell renderer
export const EditableDropdownCell = ({
    initialValue,
    row: { index, original, id },
    columnId,
    updateMyData,
    dropList,
    dbUpdate = true,
    isNullable = false,
    autoComplete = true,
}) => {


    // We need to keep and update the state of the cell normally
    const [code, setCode] = useState(initialValue)

    // TODO: Find a way to simplyfy this.
    const returnValueFromCode = (selectedCode) => {
        if (dropList.length > 0) {
            var result = dropList.filter((item) => {
                return item.code == selectedCode
            })
            if (result.length > 0) {
                return result[0].value
            }
        }
    }

    const onChange = item => {
        if (item != null && item.code !== initialValue) {
            setCode(item.code)
            updateMyData(index, columnId, item && item.code, id)
        }
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setCode(initialValue)
    }, [initialValue])

    return ((original.new && original.new == true) || dbUpdate) ? <DropdownInputCell defaultList={dropList} onItemChange={onChange} initValue={code} isNullable={isNullable} autoComplete={autoComplete} /> : <p>{returnValueFromCode(code)}</p>
}

export default {
    EditableInputTextCell,
    EditableDropdownCell,
    EditableCheckBoxCell
}