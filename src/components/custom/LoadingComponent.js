import React from 'react'

export const LoadingComponent = () => {
    return (
        <div className="main-loader"  >
            <img src="../../../public/assets/images/loading.svg" alt="loader" />
            <div className="main-loader__txt">Loading ....</div>
        </div>
    )
}

export default {
    LoadingComponent
}
