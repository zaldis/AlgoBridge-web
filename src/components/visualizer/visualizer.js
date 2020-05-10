import React from 'react';
import * as d3 from 'd3';


const Visualizer = (props) => {

    const {rowNumber, borderRef, isActive} = props;
    const svgId = `board-${rowNumber}`;

    let activeStyle = {
        height: '100%',
        width: '100%',
        backgroundColor: '#e1d1d1',
        border: '3px solid black'
    };
    if (isActive) {
        activeStyle['border'] = '3px solid orange'
    }

    return (
        <>
            <div style={{ height: '120px', width: '60%' }}>
                <svg id={svgId} viewBox="0 0 600 100" style={ activeStyle } ref={borderRef}></svg>
            </div>
        
            <br/>
        </>
    );
};


export default Visualizer;