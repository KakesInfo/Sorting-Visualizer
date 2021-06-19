import Algorithm from "./Algorithm"

class InsertionSort extends Algorithm {

  constructor () {
    super("Tri par insertion")
  }

  execute (items) {
	let new_items = [...items];

	let index = 1;
	while (index < new_items.length)
	{
		// stoque la valeur actuelle
		const tmp = new_items[index].size;
		let swap = index - 1;
		while (swap >= 0 && new_items[swap].size > tmp)
		{
			// déplace le nombre
			new_items[swap + 1].size = new_items[swap].size;

			this.addStep({ "select": [swap + 1, swap] })
			this.addStep({
				"swap": {  left: swap + 1, right: swap }
			})
			swap--;
		}
		this.addStep({ "select": [swap + 1] })
		this.addStep({
			"insert": {  index: swap + 1, value: tmp }
		})
		new_items[swap + 1].size = tmp;
		index++;
	}

	return new_items;
  }
}

export default InsertionSort
