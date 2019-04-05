import React from 'react'

class TabataTime extends React.Component {
    
    

    render(){
        const {tabataTime} = this.props
        const textColor = (time) => {
            if(time === 1 || time === 2 || time === 3){
                return {color: 'red'}
            }
        }
        return (
            <div>
                <h2 style = {textColor(tabataTime)}>{tabataTime}</h2>
            </div>
        )
    }
}




export default TabataTime