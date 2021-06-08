import { createContext } from "react";

const defaultContext = {
	items: [],
	setItems: () => {},
	count: [],
	setCount: () => {}
}

export default createContext(defaultContext);
