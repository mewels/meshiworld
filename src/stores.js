// import { writable } from 'svelte/store';

import { persistent } from "../src/lib/PersistentStore.js"

export const theme = persistent({
	start_value: "chai",
	key: "theme", // key to save as in Storage
    serialize: (value) => value,
    deserialize: (value) => value,
	storage_type: "localStorage" // Storage object to use
})