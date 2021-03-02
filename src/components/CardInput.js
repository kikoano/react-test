import React from "react";
import { Redirect } from 'react-router'
import "./CardInput.css"

const generateID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const CardTypes = {
    4: "Visa",
    5: "MasterCard",
    6: "Discover"
}

class CardInfo {
    constructor(id, name, cardNumber, expires) {
        this.id = id;
        this.name = name;
        this.cardNumber = cardNumber;
        this.expires = expires;
        this.type = CardTypes[this.cardNumber[0]];
    }
}

export default class CardInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cardNumber: "",
            expires: "",
            cardNumberError: "",
            expiresError: "",
            redirect: false
        }
    }
    componentDidMount() {
        if (this.props.type == "edit") {
            const card = JSON.parse(localStorage.getItem(this.props.id));
            this.setState({
                name: card.name,
                cardNumber: card.cardNumber,
                expires: card.expires
            });
        }
    }

    cardValidations = (name, value) => {
        if (name === "cardNumber") {
            if (![4, 5, 6].some(n => n == value[0]) || value.length != 16) // for this case card must have 16 numbers (inace postojat karticki so 19 broevi)
                this.setState({ cardNumberError: "Wrong card number" });
            else
                this.setState({ cardNumberError: "" });
        }
        if (name === "expires") {
            const month = parseFloat(value.substring(0, 2));
            const year = 2000 + parseFloat((value.substring(3, 6)));
            const date = new Date(year, month);
            if (isNaN(Date.parse(date)) || date <= Date.now() || value.length != 5 || value[2] != "/")
                this.setState({ expiresError: "Wrong date" });
            else
                this.setState({ expiresError: "" });
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.cardValidations(e.target.name, e.target.value);
    }

    handleSaveClick = (e) => {
        let id;
        if (this.props.type == "edit")
            id = this.props.id;
        else
            id = generateID();
        const card = new CardInfo(id, this.state.name, this.state.cardNumber, this.state.expires);
        localStorage.setItem(card.id, JSON.stringify(card));
        this.setState({ redirect: true });
    }

    render() {
        return (
            <form className="card-input">
                {this.state.redirect && <Redirect to="/cards" />}
                <label>Name
                <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}></input>
                </label>
                <label>Card Number
                <input type="number" name="cardNumber" value={this.state.cardNumber} onChange={this.handleInputChange}></input>
                    <span className="error">{this.state.cardNumberError}</span>
                </label>
                <label>Expires on
                <input type="text" name="expires" value={this.state.expires} onChange={this.handleInputChange}></input>
                    <span className="error">{this.state.expiresError}</span>
                </label>
                <button disabled={this.state.cardNumberError || this.state.expiresError || !this.state.name || !this.state.cardNumber || !this.state.expires} onClick={this.handleSaveClick}>Save</button>
            </form>
        );
    }
}