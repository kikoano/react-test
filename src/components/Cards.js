import React from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

export default class Cards extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const cards = Object.keys(localStorage).map(k => JSON.parse(localStorage.getItem(k)))
        return (
            <ul>{cards.length > 0 && "List of User cards:"}
                {cards.map(card => (
                    <li className="card" key={card.id}>
                        <Link to={"/cards/" + card.id + "/edit"}>
                            <div className="cardType">{card.type}</div>
                            <div>{card.name}</div>
                            <div>{card.cardNumber}</div>
                            <div>{card.expires}</div>
                        </Link>
                    </li>
                ))}
                    <li className="card addCard" key={"add"}>
                        <Link to={"/cards/add"}>
                            +
                        </Link>
                    </li>
          </ul>
        )
    }
}