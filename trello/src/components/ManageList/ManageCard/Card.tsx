import React, { useState, useContext, FormEvent } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";

import CardOptions from "./CardOptions";
import { CardObject } from "types/Types";
import { ListContext } from "../../../utils/ListContext";

type CardProps = {
	card: CardObject,
	listName: string,
	listIndex: number,
};

function Card({ card, listName, listIndex }: CardProps) {
	const [cardTitle, setCardTitle] = useState<string>(card.title);
	const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
	const [showCardOptions, setShowCardOptions] = useState<boolean>(false);

	const { lists, handleListEditing } = useContext(ListContext);

	const handleBlur = () => {
		if (!cardTitle.trim()) {
			setIsTitleEditing(false);
			setCardTitle(card.title);
		}
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (cardTitle.trim()) {
			const list = lists[listIndex];
			const newCard = {...card, title: cardTitle};
			const tmp = {
				...list,
				cards: list.cards.map((object) => object.id === card.id ? newCard : object)
			};
    
			handleListEditing(listIndex, tmp);
			setIsTitleEditing(false);
		}
	};

	return (
		<div>
			{isTitleEditing ? (
				<form onSubmit={(event) => handleSubmit(event)}>
					<textarea className="w-full h-40 p-2.5 mb-1 rounded-md bg-white border border-b-4 border-fuchsia-600/30 border-b-violet-700/[0.35]" id='cardEditing' name="cardEditing" value={cardTitle} onChange={(event) => { setCardTitle(event.target.value); }} onBlur={handleBlur} autoFocus />
					<div className='mb-2.5'>
						<button type="submit" className="mr-2.5 text-white bg-cyan-400">Save</button>
						<button type="reset" onClick={() => { setIsTitleEditing(false); setCardTitle(card.title); }} className="text-neutral-600 hover:bg-stone-200">Cancel</button>
					</div>
				</form>
			) : (
				<p className="group flex items-center justify-between px-2.5 py-1 mb-2.5 rounded-md border border-fuchsia-600/30 border-b-4 border-b-violet-700/[0.35] cursor-pointer hover:border-teal-400/50 bg-white" onClick={() => setShowCardOptions(true)}>
					<span className="w-61 white-space-pre-wrap break-words">{cardTitle}</span>
					<MdOutlineModeEditOutline className="text-4xl p-2 cursor-pointer rounded-full opacity-0 group-hover:opacity-100 hover:bg-pink-100/60" onClick={(event) => { event.stopPropagation(); setIsTitleEditing(true); }} />
				</p>
			)}

			{showCardOptions ? <CardOptions listName={listName} card={card} onClose={() => { setShowCardOptions(false); }} /> : null}
		</div>
	);
}

export default Card;
