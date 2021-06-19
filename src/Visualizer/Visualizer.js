import React from 'react';

import SelectionSort from "../Algorithms/SelectionSort"
import InsertionSort from "../Algorithms/InsertionSort"
import BubbleSort from "../Algorithms/BubbleSort"

export default class Visualizer extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      executing: false,
      itemsCount: 100,
      items: []
    }

    this.handleRandom = this.handleRandom.bind(this)
    this.handleRange = this.handleRange.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  componentDidMount () {
    this.setState({ items: this.generateItems(this.state.itemsCount) })
  }

  generateItems (itemsCount) {
    let items = []
    for (let i = 0; i < itemsCount; i++)
      items.push({
        size: Math.floor(Math.random() * 99 + 1),
        className: "visualizer-item"
      })
    return items
  }

  handleRandom (event) {
	if (this.state.executing) return;
    this.setState({ items: this.generateItems(this.state.itemsCount) })
  }

  handleRange(event) {
	if (this.state.executing) return;
    let value = event.currentTarget.value

    this.setState({
      itemsCount: value,
      items: this.generateItems(value)
    })
  }

  handleSort (event, algorithm) {
	if (this.state.executing) return;
	this.setState({executing: true});

	let items = this.state.items
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

	let stepIndex = 0;
	const id = setInterval(() => {
		if (stepIndex >= sorter.steps.length)
			return clearInterval(id);

		let step = sorter.steps[stepIndex]
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
		else if (step.insert) {
			items[step.insert.index].size = step.insert.value;
		}

        this.setState({ items })
      	stepIndex += 1
	}, 135);

	this.setState({executing: false});
  }

  render () {
    return <div className="visualizer">
      <nav className="visualizer-navigation">
        <div className="left">
          <button
            className="visualizer-navigation__random"
            type="button"
            onClick={this.handleRandom}
          ><i className="fas fa-random"></i></button>
          <input
            className="visualizer-navigation__count"
            type="range"
            min="10"
            max="100"
            value={this.state.itemsCount}
            onChange={this.handleRange}
          />
        </div>
        <div className="right">
          <button
            className="visualizer-navigation__button"
            type="button"
            onClick={(e) => this.handleSort(e, "selection")}
          >Tri par sélection</button>
          <button
            className="visualizer-navigation__button"
            type="button"
            onClick={(e) => this.handleSort(e, "insertion")}
          >Tri par insertion</button>
          <button
            className="visualizer-navigation__button"
            type="button"
            onClick={(e) => this.handleSort(e, "bubble")}
          >Tri à bulle</button>
        </div>
      </nav>
      <div className="visualizer-container">
        {this.state.items.map((item, index) => {
          if(item !== undefined) {
            return <div
            className={item.className}
            style={{
              height: item.size + "%"
            }}
            key={index}
            />
          }
          return null
        })}
      </div>
    </div>;
  }
}
