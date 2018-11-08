import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

// Draggable Hook => use-react package coming soon
function useDraggable({ styles = {} } = {}) {
    const refEl = useRef(null);

    const [isDragging, setDragging] = useState(false);
    const [coors, setCoors] = useState([0, 0]);

    const onDrag = e => {
        const x = e.clientX - refEl.current.offsetWidth / 2;
        const y = e.clientY - refEl.current.offsetHeight / 2;
        setCoors([x, y]);
    };

    const endDrag = e => {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', endDrag);

        setDragging(false);
    };

    const startDrag = e => {
        const x = e.clientX - refEl.current.offsetWidth / 2;
        const y = e.clientY - refEl.current.offsetHeight / 2;

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', endDrag);

        setCoors([x, y]);
        setDragging(true);
    };

    return {
        draggable: {
            style: {
                ...styles,
                cursor: isDragging ? 'grabbing' : 'grab',
                position: 'absolute',
                left: coors[0],
                top: coors[1],
            },
            onMouseDown: startDrag,
            ref: refEl,
        },
    };
}

// ====================================================

const expensiveCalc = () => {
    let num = 0;
    for (let i = 0; i < 6e6; i++ ) {
        num += Math.random();
    }
    return num;
}

function DisplayCoors({ x, y }) {
    
    expensiveCalc();

    return (
        <p
            style={{
                margin: 'auto',
                pointerEvents: 'none',
                userSelect: 'none',
                marginTop: '70px',
                color: 'white',
                fontSize: '20px'
            }}
        >
            { `${x} x ${y}` }
        </p>
    );
}

function Example() {
    const { draggable } = useDraggable({
        styles: {
            display: 'flex',
            height: '200px',
            width: '200px',
            backgroundColor: '#df209c',
        },
    });

    return (
        <div {...draggable}>
            <DisplayCoors 
                x={draggable.style.left}
                y={draggable.style.top}
            />
        </div>
    );
}


ReactDOM.render(
  <Example />,
  document.getElementById('root')
);
