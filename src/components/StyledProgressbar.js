import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

const StyledProgressbar = ({tabataTime, work, getReady, magicNum}) => {

    const getColorBar = (time, work, getReady) => {
        if(time === 3 || time === 2 || time === 1){
            return '#ea1515'//red
        }
        if(getReady, !work){
            return "#2185d0"
        }
        if(time && work && !getReady){
            return '#21ba45'
        }
        if(time && !work && !getReady){
            return '#2185d0'
        }

    }

    const getTextColor = (time) => {
      if(time === 3 || time === 2 || time === 1){
        return '#ea1515'//red
      }

      return "#141313"
    }

    return (
      <CircularProgressbar
        percentage={(tabataTime)*magicNum}
        text={tabataTime} 
      
        // Path width must be customized with strokeWidth,
        // since it informs dimension calculations.
        strokeWidth={5}
        // You can override styles either by specifying this "styles" prop,
        // or by overriding the default CSS here:
        // https://github.com/iqnivek/react-circular-progressbar/blob/master/src/styles.css
        styles={{
          // Customize the root svg element
          root: {},
          // Customize the path, i.e. the part that's "complete"
          path: {
            // Tweak path color:
            stroke: getColorBar(tabataTime, work, getReady),
            // Tweak path to use flat or rounded ends:
            strokeLinecap: "butt",
            // Tweak transition animation:
            transition: "stroke-dashoffset 0.5s ease 0s"
          },
          // Customize the circle behind the path
          trail: {
            // Tweak the trail color:
            stroke: "#d4d2dd"
          },
          // Customize the text
          text: {
            // Tweak text color:
            fill: getTextColor(tabataTime),
            // Tweak text size:
            fontSize: "30px",
            fontFamily: 'Gloria Hallelujah'
          }
        }}
        counterClockwise
      />
    );
  }
  export default StyledProgressbar;
  