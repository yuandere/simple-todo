import { useEffect, useState } from 'react';
import Addbar from './components/AddBar';

import Completed from './components/Completed';
import List from './components/List';
import { v1 as uuidv1 } from 'uuid';
import tachyons from 'tachyons';
import './App.css';

function App() {
	const [route, setRoute] = useState('all');
	const [itemList, updateList] = useState([
		{ id: uuidv1(), item: 'example 1' },
		{ id: uuidv1(), item: 'example 2' },
	]);
	const [newItem, updateNewItem] = useState('');
	const [completedList, updateCompleted] = useState([
		{ id: uuidv1(), item: 'example 3' },
	]);

	const grabNewItem = (event) => {
		updateNewItem(event.target.value);
	};

	const pushNewItem = () => {
		updateList(() => itemList.concat({ id: uuidv1(), item: newItem }));
		document.querySelector('#input-field').value = '';
	};

	const completeItem = (event) => {
		const id = event.target.parentElement.id;
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
		const id = event.target.parentElement.id;
		if (itemList.some((object) => object.id === id)) {
			return;
		}
		const compIndex = completedList.findIndex((object) => object.id === id);
		const copy = JSON.parse(JSON.stringify(completedList));
		copy.splice(compIndex, 1);
		updateList(itemList.concat(completedList[compIndex]));
		updateCompleted(copy);
	};

	return (
		<div className="App">
			<h2 className="tc">#todo</h2>
			<div id="container" className="ba flex flex-column items-center">
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
					<ul id="list-container">
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
							completedList.map((i) => {
								return (
									<List
										item={i.item}
										id={i.id}
										key={i.id}
										completed
										returnItem={returnItem}
									></List>
								);
							})
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