import React from "react";
import Operation from "../operation";


const DivisionOperation = (props) => {
    const {left, right, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <>
                <Operation type={left.type} parameter={left.parameter}/>
                    &divide;
                <Operation type={right.type} parameter={right.parameter}/>
            </>
        );
    } else if (mode === 'parameter') {
        content = (
            <>
                &#123; {childrenIds[0]} &#125;
                &divide;
                &#123; {childrenIds[1]} &#125;
            </>
        );
    }

    return (
        <div style={{
            display: 'flex',
        }}>
            {content}
        </div>
    );
};

export default DivisionOperation;
