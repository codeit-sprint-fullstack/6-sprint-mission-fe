import React from "react";
import styles from "./ProductCard.module.css";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


export default function ProductCard({ product }) {
    const navigate = useNavigate();
    
    // 가격 포맷 함수
    const formatPrice = (price) => {
        return new Intl.NumberFormat().format(price) + "원"; 
    };

    const toggleProductDetail = () => {
        navigate(`/product/${product.name}`);
    }

    return (
        <li className={styles.productCard} onClick={toggleProductDetail}>
            <img
                src={
                    product.images.length === 0 || product.images[0].includes("example") || product.images[0].includes("via.placeholder") 
                        ? "/images/product_img.png"
                        : product.images[0]
                }
                alt={product.name}
                className={styles.productCard__image}
            />
            <span className={styles.productCard__name}>{product.name}</span>
            <p className={styles.productCard__price}>{formatPrice(product.price)}</p>
            <div className={styles.productCard__favorites}>
                <CiHeart className={styles.productCard__heartIcon} />
                <span className={styles.productCard__favoriteCount}>{product.favoriteCount}</span>
            </div>
        </li>
    );
}
