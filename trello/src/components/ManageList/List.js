import { useState, useContext } from "react";
import { ListContext } from "../../utils/ListContext";

import { GoKebabHorizontal } from "react-icons/go";

import ListActions from "./ListActions";
import AddCard from "./ManageCard/AddCard";
import AllCards from "./ManageCard/AllCards";

function List({ currentList, id }) {
    const [list, setList] = useState(currentList);
    const [title, setTitle] = useState(list.title);
    const [isListActions, setIsListActions] = useState(false);
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const { handleListEditing } = useContext(ListContext);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (title.trim()) {
                let tmp = list;
                tmp.title = title;
                setList(tmp);
                handleListEditing(id, tmp);
                setIsTitleEditing(false);
            }
        }
    };

    const handleBlur = () => {
        if (!title.trim()) {
            setIsTitleEditing(false);
            setTitle(list.title);
        } else {
            let tmp = list;
            tmp.title = title;
            setList(tmp);
            handleListEditing(id, tmp);
            setIsTitleEditing(false);        
        }
    };

    const handleTitleEditing = (event) => {
        setTitle(event.target.value);
    };

    const handleAddCard = (newCard) => {
        let tmp = list;
		tmp.cards.push(newCard);
        setList(tmp);
        handleListEditing(id, tmp);
    };

    const handleCardEditing = (index, newCard) => {
        let tmp = list;
		tmp.cards[index] = newCard;
    };

    return (
        <div>

            <div style={{display: 'flex'}}>
                {isTitleEditing ? (
                    <input className="titleEditing" id="listEditing" name="listEditing" type="text" value={title} onChange={handleTitleEditing} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus></input>
                ) : (
                    <p className="titleEditing" onClick={() => { setIsTitleEditing(true) }}>{list.title}</p>
                )}
                <GoKebabHorizontal className="listMenu" onClick={() => { setIsListActions(true) }} />
            </div>

            {isListActions ? <ListActions onClose={() => setIsListActions(false)} /> : null}

            <AllCards listName={list.title} cards={list.cards} onCardEditing={handleCardEditing} />
            <AddCard onAddCard={handleAddCard} />

        </div>
    );
}

export default List;