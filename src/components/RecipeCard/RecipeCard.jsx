import "./RecipeCard.css";
import { Link } from "react-router-dom";

export default function RecipeCard({urlId, imgSrc, imgAlt, category, title, className}) {
    return (
        <div className={`recipe_card ${className || ''}`}>
            <Link to={`/recipe/${urlId}`} className="recipe_link">
                <img src={imgSrc} alt={imgAlt} className="recipe_img" />
                <div className="recipe_info">
                    <h3 className="recipe_title">{title}</h3>
                    <p className="recipe_category">{category}</p>
                </div>
            </Link>
        </div>
    )
}