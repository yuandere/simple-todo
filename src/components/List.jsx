const List = ({ item, id, completeItem, returnItem, completed, deleteItem, route }) => {
	return (
		<article className="flex justify-between items-center mb2" id={id}>
			<div className="flex items-end">
				{!completed ? (
					<input
						type="checkbox"
						onChange={completeItem ? completeItem : returnItem}
					></input>
				) : (
					<input
						type="checkbox"
						defaultChecked={completed}
						onChange={completeItem ? completeItem : returnItem}
					></input>
				)}
				<p
					className="list-item"
					style={completed ? { textDecoration: 'line-through' } : null}
				>
					{item}
				</p>
			</div>
			<div className="twopxdown">
				{route === 'completed' ? <span className="material-icons" onClick={deleteItem}>delete_outline</span> : null}
			</div>
		</article>
	);
};

export default List;
