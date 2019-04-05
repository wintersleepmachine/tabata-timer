import React from 'react'

const Timer = ({seconds, minutes}) => {
    return (
        <div>
            <h1>{minutes}:{seconds}</h1>
        </div>
    )
}

export default Timer