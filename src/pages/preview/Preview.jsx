import React from 'react';
import { useLocation } from 'react-router-dom';
import "./preview.css";


function Preview() {
    const location = useLocation();
    const getDataFromQueryString = () => {
        const params = new URLSearchParams(location.search);
        const data = params.get('data');

        // Parse the JSON string back to an object
        return data ? JSON.parse(data) : [];
    };

    const data = getDataFromQueryString();
    const totalPrice = data.reduce((sum, item) => sum + parseFloat(item.total.label), 0);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className='preview-container' id="printable">
            <h2 style={{ textAlign: 'center', padding: '20px' }}>Krish Tech</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th className="table-header">Name</th>
                        <th className="table-header">Price</th>
                        <th className="table-header">Quantity</th>
                        <th className="table-header">Discount</th>
                        <th className="table-header">Total</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="table-cell">{item.name.label}</td>
                            <td className="table-cell">₹{item.price.label}</td>
                            <td className="table-cell">{item.qty.label}</td>
                            <td className="table-cell">{item.discount.label}%</td>
                            <td className="table-cell">₹{item.total.label}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4" className="table-footer">Total Price</td>
                        <td className="table-footer">₹{totalPrice.toFixed(2)}</td>
                    </tr>

                </tfoot>
            </table>
            <footer style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9em' }}>
                Thank you for your business!
            </footer>
            <button onClick={handlePrint} className="print-button">Print</button>
        </div>
    );
}

export default Preview;
