import React from "react";
import CardInput from "./CardInput";

export default class AddCard extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
        return (
            <CardInput type="add"/>
        );
    }
}