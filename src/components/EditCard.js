import React from "react";
import CardInput from "./CardInput";
import {useParams} from "react-router-dom";

export default function AddCard() {
    let { id } = useParams();
    return (
        <CardInput type="edit" id={id}/>
    );
}