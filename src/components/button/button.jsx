import React from 'react';
import './button.css';


export default function Button({label, onClick, disabled }) {
    return (
        <button className="btn" onClick={onClick} disabled ={disabled}>
            {label}
        </button>
    )
}
