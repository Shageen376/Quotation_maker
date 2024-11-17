import React, { useState } from 'react';

export const Modal=({ isOpen, onClose, onConfirm })=> {
    // State for each input field
    const [formData, setFormData] = useState({
        name: "",
        quantity: 1,
        discount: 0,
    });

    // Update form data based on input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'quantity' || name === 'discount' ? Number(value) : value
        }));
    };

    // Confirm button handler
    const handleConfirm = () => {
        onConfirm(formData);
        onClose();
    };

    // Render only when the modal is open
    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={dialogStyle}>
                <h3>Enter Product Details</h3>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                    />
                </label>
                <label>
                    Discount (%):
                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        min="0"
                    />
                </label>
                <div style={{ marginTop: "15px" }}>
                    <button onClick={handleConfirm}>OK</button>
                    <button onClick={onClose} style={{ marginLeft: "10px" }}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

// Styles for overlay and dialog
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const dialogStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'left',
    width: '300px'
};