import RecipeCard from "../RecipeCard/RecipeCard";
import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import "./FavoriteCard.css";

export default function FavoriteCard({ favorite }) {
    const { removeFavorite } = useContext(FavoritesContext);
    const handleRemove = () => {
        removeFavorite(favorite.idMeal);
    };
    return (
        <div className="favorite_card">
            <RecipeCard
                urlId={favorite.idMeal}
                imgSrc={favorite.strMealThumb}
                imgAlt={favorite.strMeal}
                category={favorite.strCategory}
                title={favorite.strMeal}
            />
            <button className="remove_favorite_button" onClick={handleRemove}>Remove</button>
        </div>
    );
}
