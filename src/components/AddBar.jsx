const AddBar = ({ grabNewItem, pushNewItem }) => {
	return (
		<div className="flex flex-column w-100">
			<form
				className="input-bar w-100 flex justify-between"
				onSubmit={(e) => {
					pushNewItem(), e.preventDefault();
				}}
			>
				<input
					id="input-field"
					placeholder="add details"
					className="w-80 f6"
					maxLength={42}
					onChange={grabNewItem}
				></input>
				<button id="addBtn" className="" type="button" onClick={pushNewItem}>
					Add
				</button>
			</form>
		</div>
	);
};

export default AddBar;
