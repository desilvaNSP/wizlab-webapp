import React, { useState } from "react";

const StudentsTest = props => {

    const [name, setName] = useState("Kasun")

    return (
        <div>Sandun & {name} : Index- {props.index}</div>
    )
}

export default StudentsTest