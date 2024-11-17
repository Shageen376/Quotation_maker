import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Modal } from '../../components/modal/modal';
import Button from '../../components/button/button';
import './home.css'

function Home() {
	const navigate = useNavigate();
	const tableRef = useRef(null);

	const data = [
		{
			name: { label: "fridge", fieldType: "text", isEditable: false, placeholder: "type name" },
			price: { label: "100", fieldType: "number", isEditable: false, placeholder: "type price", className: "small-column" },
			qty: { label: "1", fieldType: "number", isEditable: false, placeholder: "type qty", default: "1", className: "small-column" },
			discount: { label: "1", fieldType: "number", isEditable: false, placeholder: "type discount", default: "0" },
			total: { label: "59", fieldType: "number", isEditable: false, isReadOnly: true, placeholder: "type total",className: "small-column" }
		},
		{
			name: { label: "frge", fieldType: "text", isEditable: false, placeholder: "type name" },
			price: { label: "100", fieldType: "number", isEditable: false, placeholder: "type price", className: "small-column" },
			qty: { label: "1", fieldType: "number", isEditable: false, placeholder: "type qty", default: "1", className: "small-column" },
			discount: { label: "1", fieldType: "number", isEditable: false, placeholder: "type discount", default: "0" },
			total: { label: "59", fieldType: "number", isEditable: false, isReadOnly: true, placeholder: "type total", className: "small-column" }
		}
	]
	const [input, setInput] = useState(data);
	const makeEditable = (ind, field) => {
		const temp = input.map(item =>
			Object.keys(item).reduce((acc, key) => {
				acc[key] = { ...item[key], isEditable: false };
				return acc;
			}, {})
		);

		// Set the clicked field to isEditable: true
		temp[ind][field].isEditable = true;
		setInput(temp);
	};
	const handleClickOutside = (event) => {
		if (tableRef.current && !tableRef.current.contains(event.target)) {
			// Execute your function here
			console.log("Clicked outside the table!");
			// Optionally, set all `isEditable` properties to false
			setInput(prevInput =>
				prevInput.map(item =>
					Object.keys(item).reduce((acc, key) => {
						acc[key] = { ...item[key], isEditable: false };
						return acc;
					}, {})
				)
			);
		}
	};
	useEffect(() => {
		// Add the event listener
		document.addEventListener("mousedown", handleClickOutside);
		// Cleanup the event listener on component unmount
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const handleValueChange = (rowIndex, fieldName, value) => {
		setInput(prevInput =>
			prevInput.map((item, index) => {
				if (index === rowIndex) {
					// Update the specific field in the row at rowIndex
					const updatedItem = {
						...item,
						[fieldName]: {
							...item[fieldName],
							label: value,  // Update the label with the new value
						}
					};

					// Calculate the total based on price, qty, and discount
					const price = parseFloat(updatedItem.price.label) || 0;
					const qty = parseFloat(updatedItem.qty.label) || 0;
					const discount = parseFloat(updatedItem.discount.label) || 0;

					const total = price * qty * (1 - discount / 100);

					// Update the total field
					updatedItem.total = {
						...updatedItem.total,
						label: total.toFixed(2),  // Format total to 2 decimal places
					};

					return updatedItem;
				}
				return item;
			})
		);
	};

	const handleRemove = (ind) => {
		setInput(prevInput => prevInput.filter((_, index) => index !== ind));
	}
	const handleAddRow = () => {
		const newData = {
			name: { label: "", fieldType: "text", isEditable: true, placeholder: "type name" },
			price: { label: "", fieldType: "number", isEditable: true, placeholder: "type price", className: "small-column" },
			qty: { label: "", fieldType: "number", isEditable: true, placeholder: "type qty", default: "1", className: "small-column" },
			discount: { label: "", fieldType: "number", isEditable: true, placeholder: "type discount", default: "0" },
			total: { label: "", fieldType: "number", isEditable: false, isReadOnly: true, placeholder: "type total", className: "small-column" }
		}
		setInput(prevState => [...prevState, newData]);
	}
    const [isDialogOpen, setDialogOpen] = useState(true);

    const handleInputSubmit = (input) => {
        console.log(`User entered: ${input}`);
    };
	return (
		<div className='app-container'>
			<h1>Quotation Creator</h1>
			<table ref={tableRef}>
				<thead>
					<tr>
						{/* <th>s.no</th> */}
						<th>name</th>
						<th className='small-column'>price</th>
						<th>qty</th>
						<th>discount</th>
						<th>total</th>
					</tr>
				</thead>
				<tbody>
					{input.map((item, index) => (
						<tr key={index}>
							{/* <td>{index + 1}</td> */}
							{Object.keys(item).map((title, ind) => (
								<td key={ind}>
									{item[title].isEditable ?
										<input type={item[title].fieldType} placeholder={item[title].placeholder} value={item[title].label} onChange={(e) => handleValueChange(index, title, e.target.value)} className={item[title].className}/> :
										<div onClick={() => !item[title].isReadOnly && makeEditable(index, title)} className={item[title].className}>{item[title].label || "N/A"}</div>}
								</td>
							))}
							<button onClick={() => handleRemove(index)}>remove</button>
							<button onClick={handleAddRow}>add</button>
						</tr>
					))}
				</tbody>

			</table>
			<div className='btn-container'>
				{input.length > 0 && <Button label="preview" disabled={false} onClick={() => navigate(`/preview?data=${JSON.stringify(input)}`)} />}
				{/* <Button label="add row" disabled={false} onClick={handleAddRow} /> */}
			</div>
			<Modal
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleInputSubmit}
            />
		</div>
	)
}

export default Home
