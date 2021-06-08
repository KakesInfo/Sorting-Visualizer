import Algorithm from "./Algorithm"

class SelectionSort extends Algorithm {

	constructor () {
		super("Tri par sélection")
	}

	execute (items) {
		let new_items = [...items]

		let pointer = 0
		while (pointer < new_items.length) {
			let minimum = new_items[pointer]
			let minimum_index = pointer

			let index = pointer
			while (index < new_items.length) {
				this.addStep({ "select": index })
				if (new_items[index].size < minimum.size) {
					minimum = new_items[index]
					minimum_index = index
				}
				index++
			}
			let tmp = new_items[pointer]
			new_items[pointer] = minimum
			new_items[minimum_index] = tmp

			this.addStep({
				"swap": {
					left: pointer,
					right: minimum_index
				}
			})
			pointer++;
		}
		return new_items
	}
}

export default SelectionSort
