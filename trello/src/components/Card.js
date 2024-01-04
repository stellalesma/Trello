import { useState } from "react";

import { MdOutlineModeEditOutline } from "react-icons/md";

import CardOptions from "./CardOptions";

function Card({ listName, card, id, onCardEditing }) {
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [isCardOptions, setIsCardOptions] = useState(false)
    const [cardTitle, setCardTitle] = useState(card.title)

    const handleSubmit = (event, id) => {
        event.preventDefault();
        
        if (cardTitle.trim()) {
            let tmp = card;
            tmp.title = cardTitle;
            onCardEditing(id, tmp);
            setIsTitleEditing(false);
        }
    };

    const handleAddDescription = (newDescription) => {
        let tmp = card;
        tmp.description = newDescription;
        onCardEditing(id, tmp);
    };

    const handleAddActivity = (newActivity) => {
        let tmp = card;
        tmp.activities.unshift(newActivity);
        onCardEditing(id, tmp);
    }

    return (
        <div>
            {isTitleEditing ? (
                <form onSubmit={(event) => handleSubmit(event, id)}>
                    <textarea className="cardTitleEditing" type="text" id='cardEditing' name="cardEditing" value={cardTitle} onChange={(event) => { setCardTitle(event.target.value) }} autoFocus></textarea>
                    <div style={{ marginBottom: '10px'}}>
                        <button type="submit" style={{ marginRight: '10px' }} className="enable">Save</button>
                        <button type="reset" onClick={() => { setIsTitleEditing(false); setCardTitle(card.title) }} className="disable">Cancel</button>
                    </div>
                </form>
            ) : (
                <p className="card cardEditing" onClick={() => { setIsCardOptions(true) }}>
                    {cardTitle}
                    <MdOutlineModeEditOutline className="editIcon" onClick={(event) => { event.stopPropagation(); setIsTitleEditing(true) }} />
                </p>
            )}

            {isCardOptions ? <CardOptions listName={listName} card={card}  onAddDescription={handleAddDescription} onAddActivity={handleAddActivity} onClose={() => { setIsCardOptions(false) }} /> : null}

        </div>
    );
}

export default Card;
