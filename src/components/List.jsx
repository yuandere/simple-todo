const List = ({ item, id, completeItem, returnItem, completed }) => {
	return (
		<article className="flex items-end" id={id}>
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
		</article>
	);
};

export default List;
