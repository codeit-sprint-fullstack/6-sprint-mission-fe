import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
    const { detail } = useParams();
    return(
        <section className="container">
            { detail && detail }
        </section>
    )
}