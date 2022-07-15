import { useEffect, useState } from 'react';
import Addbar from './components/AddBar';
import List from './components/List';
import { v1 as uuidv1 } from 'uuid';
import tachyons from 'tachyons';
import './App.css';

function App() {
	const [route, setRoute] = useState('all');
	const [itemList, updateList] = useState(() => {
		if (localStorage.getItem('items') === null) {
			return [
				{ id: uuidv1(), item: 'example 1' },
				{ id: uuidv1(), item: 'example 2' },
			]
		}	else {
			return JSON.parse(localStorage.getItem('items'));
		};
	});
	const [newItem, updateNewItem] = useState('');
	const [completedList, updateCompleted] = useState(() => {
		if (localStorage.getItem('completed') === null) {
			return [
				{ id: uuidv1(), item: 'example 3' },
			]
		}	else {
			return JSON.parse(localStorage.getItem('completed'));
		};
	});

	useEffect(() => {
		if (itemList.length === 0) {
			localStorage.setItem('items', '[]');
		} else {
			localStorage.setItem('items', JSON.stringify(itemList));
		}
	}, [itemList]);

	useEffect(() => {
		if (completedList.length === 0) {
			localStorage.setItem('completed', '[]');
		} else {
			localStorage.setItem('completed', JSON.stringify(completedList));
		}
	}, [completedList]);

	const grabNewItem = (event) => {
		updateNewItem(event.target.value);
	};

	const pushNewItem = () => {
		if (newItem === '') {return}
		updateList(() => itemList.concat({ id: uuidv1(), item: newItem }));
		document.querySelector('#input-field').value = '';
		updateNewItem('');
	};

	const completeItem = (event) => {
		const id = event.target.parentElement.parentElement.id;
		if (completedList.some((object) => object.id === id)) {
			return;
		}
		const origIndex = itemList.findIndex((object) => object.id === id);
		const copy = JSON.parse(JSON.stringify(itemList));
		copy.splice(origIndex, 1);
		updateCompleted(completedList.concat(itemList[origIndex]));
		updateList(copy);
	};

	const returnItem = (event) => {
		const id = event.target.parentElement.parentElement.id;
		if (itemList.some((object) => object.id === id)) {
			return;
		}
		const compIndex = completedList.findIndex((object) => object.id === id);
		const copy = JSON.parse(JSON.stringify(completedList));
		copy.splice(compIndex, 1);
		updateList(itemList.concat(completedList[compIndex]));
		updateCompleted(copy);
	};

	const deleteItem = (event) => {
		const id = event.target.parentElement.parentElement.id;
		const compIndex = completedList.findIndex((object) => object.id === id);
		const copy = JSON.parse(JSON.stringify(completedList));
		copy.splice(compIndex, 1);
		updateCompleted(copy);
	};

	const deleteAll = () => {
		updateCompleted([]);
	};

	return (
		<div className="App">
			<h2 className="tc f2">#todo</h2>
			<div id="container" className="bt bb flex flex-column items-center">
				<div id="route-bar" className="bb w-60">
					<p
						className={
							route === 'all' ? 'route-active route-name' : 'route-name'
						}
						onClick={() => setRoute('all')}
					>
						All
					</p>
					<p
						className={
							route === 'active' ? 'route-active route-name' : 'route-name'
						}
						onClick={() => setRoute('active')}
					>
						Active
					</p>
					<p
						className={
							route === 'completed' ? 'route-active route-name' : 'route-name'
						}
						onClick={() => setRoute('completed')}
					>
						Completed
					</p>
				</div>
				<div id="route-container" className="w-60">
					{route === 'all' || route === 'active' ? (
						<Addbar
							grabNewItem={grabNewItem}
							pushNewItem={pushNewItem}
						></Addbar>
					) : null}
					<ul id="list-container" className="">
						{route === 'active' ? (
							itemList.map((i) => {
								return (
									<List
										item={i.item}
										id={i.id}
										key={i.id}
										completeItem={completeItem}
									></List>
								);
							})
						) : route === 'completed' ? (
							<>
								{completedList.map((i) => {
									return (
										<List
											item={i.item}
											id={i.id}
											key={i.id}
											completed
											deleteItem={deleteItem}
											route={route}
											returnItem={returnItem}
										></List>
									);
								})}
								{completedList.length > 0 ? (
									<button
										id="delete-button"
										className="flex justify-center items-center"
										onClick={deleteAll}
									>
										<span className="material-icons">delete_outline</span>
										<p>delete all</p>
									</button>
								) : null}
							</>
						) : (
							<>
								{itemList.map((i) => {
									return (
										<List
											item={i.item}
											id={i.id}
											key={i.id}
											completeItem={completeItem}
										></List>
									);
								})}
								{completedList.map((i) => {
									return (
										<List
											item={i.item}
											id={i.id}
											key={i.id}
											completed
											returnItem={returnItem}
										></List>
									);
								})}
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
