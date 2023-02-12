import React, { useState, useEffect } from 'react'
import closeIcon from '../Custom/icons/close-icon.svg'

export const CustomTagInput = ({ 
    initialValue = "", 
    initialTags = [], 
    updateTags, type, 
    disable = false, 
    fieldValidation, 
    required = false,
    tagDeletionValidation }) => {
    // We need to keep and update the state of the cell normally
    const [input, setInput] = useState(initialValue);
    const [tags, setTags] = useState(initialTags);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const [invalidMessageKeyValue, setInvalidMessageKeyValue] = useState({})
    const [tagsWithValidy, setTagsWithValidity] = useState({})

    useEffect(() => {
        updateTags(tagsWithValidy)
    }, [tagsWithValidy])

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();
        if (key === ',' && trimmedInput.length && !tags?.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            var updatedInvalidErrorMessage = invalidMessageKeyValue
            var updatedTagsWithValidity = tagsWithValidy
            fieldValidation(trimmedInput, (flag, message) => {
                if (!flag) {
                    updatedInvalidErrorMessage = {
                        ...invalidMessageKeyValue,
                        [trimmedInput]: message
                    }
                }
                updatedTagsWithValidity = {
                    ...tagsWithValidy,
                    [trimmedInput]: flag
                }
            });
            setInvalidMessageKeyValue(updatedInvalidErrorMessage);
            setTagsWithValidity(updatedTagsWithValidity);
            setInput('');
        }

        if (key === "Backspace" && !input.length && tags?.length && isKeyReleased) {
            delete invalidMessageKeyValue[tags[tags?.length - 1]];
            delete tagsWithValidy[tags[tags?.length - 1]];
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            setInput(poppedTag);
        }
        setIsKeyReleased(false);
    };

    const onBlur = (e) => {
        const trimmedInput = input.trim();
        if (trimmedInput.length > 0 && !tags.includes(trimmedInput)) {
            setTags(prevState => [...prevState, trimmedInput]);
            var updatedInvalidErrorMessage = invalidMessageKeyValue
            var updatedTagsWithValidity = tagsWithValidy
            fieldValidation(trimmedInput, (flag, message) => {
                if (!flag) {
                    updatedInvalidErrorMessage = {
                        ...invalidMessageKeyValue,
                        [trimmedInput]: message
                    }
                }
                updatedTagsWithValidity = {
                    ...tagsWithValidy,
                    [trimmedInput]: flag
                }
            })
            setInvalidMessageKeyValue(updatedInvalidErrorMessage);
            setTagsWithValidity(updatedTagsWithValidity);
            setInput('');
        }
    }

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
        tagDeletionValidation(tags[index], (deleteFlag) => {
            if (deleteFlag) {
                delete invalidMessageKeyValue[tags[index]];
                delete tagsWithValidy[tags[index]];
                setTags(prevState => prevState.filter((tag, i) => i !== index))
            }
        });
    }

    const validationErrorMessage = () => {
        var message = ""
        var valid = true;
        for (const key in tagsWithValidy) {
            if (Object.hasOwnProperty.call(tagsWithValidy, key)) {
                const element = tagsWithValidy[key];
                if (!element) {
                    message += invalidMessageKeyValue[key] + ', '
                    valid = false;
                }
            }
        }
        return {
            error: message,
            validity: valid
        }
    }

    return (
        <div style={{ textAlign: 'left' }}>
            <div className="taginput-container">
                {tags?.map((tag, index) => (
                    <div className={tag in invalidMessageKeyValue ? "tag tag--invalid" : "tag"}>
                        {tag}
                        <img className="tag--clear" alt='clear input' src={closeIcon} onClick={(e) => {deleteTag(index)}
                        }></img>
                    </div>
                ))}
                <input
                    value={input}
                    placeholder="Comma separate for multiple inputs"
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disable}
                />
            </div>
            {!validationErrorMessage().validity && <label className='validation-error-text' style={{ marginLeft: '200px' }}>
                {
                   validationErrorMessage().error 
                }
            </label>}
            {(validationErrorMessage().validity && ((input == "" || input == null) && tags?.length < 1) && required) && <label className='required-text' style={{ marginLeft: '200px' }}>
                {"Required"}
            </label>}
        </div>

    )
}