import React from "react";
import { createContext, useState } from "react";

import PropTypes from "prop-types";

const listData = [
	{
		"id": 1,
		"title": "To Do",
		"cards": []
	},
	{
		"id": 2,
		"title": "In Progress",
		"cards": []
	},
	{
		"id": 3,
		"title": "Done",
		"cards": []
	},
];


// const forTraining = [
// 	{
// 		"id": 1,
// 		"title": "List 1",
// 		"cards": [
// 			{
// 				"listId": 1,
// 				"id": 2,
// 				"title": "L1 C1",
// 				"description": "",
// 				"activities": []
// 			},
// 			{
// 				"listId": 1,
// 				"id": 3,
// 				"title": "L1 C2",
// 				"description": "",
// 				"activities": []
// 			},
// 			{
// 				"listId": 1,
// 				"id": 4,
// 				"title": "L1 C3",
// 				"description": "",
// 				"activities": []
// 			}
// 		]
// 	},
// 	{
// 		"id": 5,
// 		"title": "List 2",
// 		"cards": [
// 			{
// 				"listId": 5,
// 				"id": 6,
// 				"title": "L2 C1",
// 				"description": "",
// 				"activities": []
// 			},
// 			{
// 				"listId": 5,
// 				"id": 7,
// 				"title": "L2 C2",
// 				"description": "",
// 				"activities": [
                    
// 				]
// 			}
// 		]
// 	}
// ];

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
	const [lastId, setLastId] = useState(3);
	const [lists, setLists] = useState(listData);
	// const [whichList, setWhichList] = useState({id: null, isLAVisible: false});
	// const [lastId, setLastId] = useState(7);

	const updatedId = () => {
		setLastId(lastId + 1);
		return lastId + 1;
	};

	const handleAddList = (newList) => {
		setLists([...lists, newList]);
	};

	const handleListEditing = (index, newList) => {
		const tmp = lists.slice();
		tmp[index] = newList;
		setLists(tmp);
	};

	const handleModifiedLists = (newLists) => {
		setLists(newLists);
	};

	const contextValue = {
		lists,
		updatedId,
		handleAddList,
		handleListEditing,
		handleModifiedLists,
	};

	console.log(lists);

	return (
		<ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
	);
};

ListProvider.propTypes = {
	children: PropTypes.node,
};
