import React, { useContext, useState } from "react"
import BubbleSort from "../Algorithms/BubbleSort";
import InsertionSort from "../Algorithms/InsertionSort";
import SelectionSort from "../Algorithms/SelectionSort";
import VisualizerContext from "./VisualizerContext";

const Visualizer = () => {
	const [items, setItems] = useState([]);
	const [count, setCount] = useState(100);

	const defaultValues = {
		items, setItems,
		count, setCount
	};

	return <VisualizerContext.Provider value={defaultValues}>
		<div className="visualizer">
			<VisualizerNavigation />
			<div className="visualizer-container">
				{items.map((item, index) => {
					if(item === undefined) return null;
					return <div
						key={index}
						className={item.className}
						style={{ height: item.size + "%" }}
					/>
				})}
			</div>
		</div>
	</VisualizerContext.Provider>;
}

const VisualizerNavigation = () => {
	return <nav className="visualizer-navigation">
		<div className="left">
			<VisualizerRandomizer />
			<VisualizerRange />
		</div>
		<div className="right">
			<VisualizerButton title="Selection Sort" action="selection"/>
			<VisualizerButton title="Bubble Sort" action="bubble"/>
			<VisualizerButton title="Insertion Sort" action="insertionb"/>
		</div>
	</nav>;
}

const VisualizerRandomizer = () => {
	const {setItems} = useContext(VisualizerContext);
	const {count} = useContext(VisualizerContext);

	const generateItems = () => {
		let items = []
		for (let i = 0; i < count; i++)
			items.push({
				size: Math.floor(Math.random() * 99 + 1),
				className: "visualizer-item"
			})
		return items
	}

	const handleClick = (event) => {
		const n_Items = generateItems();
		setItems(n_Items);
		event.preventDefault();
	}

	return <button
		className="visualizer-navigation__random"
		type="button"
		onClick={handleClick}
	><i className="fas fa-random"></i></button>
}

const VisualizerRange = () => {
	const {count, setCount} = useContext(VisualizerContext);

	const handleChange = (event) => {
		setCount(
			event.currentTarget.value ||
			event.target.value
		)
	}

	return <input
		className="visualizer-navigation__count"
		type="range"
		min="10"
		max="100"
		value={count}
		onChange={handleChange}
	/>
}

const VisualizerButton = ({title, action}) => {
	const {items, setItems} = useContext(VisualizerContext);

	const handleSort = (event, algorithm) => {
		let sorter = null
		switch (algorithm) {
		case "selection":
			sorter = new SelectionSort()
			break;
		case "insertion":
			sorter = new InsertionSort()
			break;
		case "bubble":
			sorter = new BubbleSort()
			break;
		default:
			throw new Error("Aucun des tris disponibles ne correpondent...")
		}
		sorter.execute(items)

		sorter.steps.forEach((step, i)=> setTimeout(() => {
			items.forEach(item => item.className = "visualizer-item")
				if (step.select !== false && step.select !== undefined) {
					let selects = []
					if (Array.isArray(step.select)) {
						selects = [...step.select]
					} else {
						selects.push(step.select)
					}
					selects.forEach(index => {
						if (items[index] !== undefined)
						items[index].className = "visualizer-item selected"
					})
				}
				else if (step.swap) {
					let tmp = items[step.swap.left]
					items[step.swap.left] = items[step.swap.right]
					items[step.swap.right] = tmp
				}

				setItems(items)
		}, 15 * i))
	}

	return <button
		className="visualizer-navigation__button"
		type="button"
		onClick={e => handleSort(e, action)}
	>{title}</button>
}

export default Visualizer;
