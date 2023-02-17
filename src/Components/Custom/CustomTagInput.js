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

    console.log("tags", tags)
    useEffect(() => {
        updateTags(tags)
    }, [tags])

    useEffect(() => {
        setTags(initialTags)
    }, [initialTags])

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();
        if (key === ',' && trimmedInput.length && !tags?.includes(trimmedInput)) {
            e.preventDefault();
            fieldValidation(trimmedInput, (flag, message) => {
                if (flag) {
                    setTags(prevState => [...prevState, {
                        "value": trimmedInput
                    }]);
                }
            });
            setInput('');
        }

        if (key === "Backspace" && !input.length && tags?.length && isKeyReleased) {
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
            fieldValidation(trimmedInput, (flag, message) => {
                if (flag) {
                    setTags(prevState => [...prevState, {
                        "value": trimmedInput
                    }]);
                }
            })
            setInput('');
        }
    }

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
        tagDeletionValidation(tags[index], (deleteFlag) => {
            if (deleteFlag) {
                setTags(prevState => prevState.filter((tag, i) => i !== index))
            }
        });
    }

    return (
        <div style={{ textAlign: 'left' }}>
            <div className="taginput-container">
                {tags?.map((tag, index) => (
                    <div className="tag">
                        {tag.value}
                        <img className="tag--clear" alt='clear input' src={closeIcon} onClick={(e) => { deleteTag(index) }
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
        </div>
    )
}