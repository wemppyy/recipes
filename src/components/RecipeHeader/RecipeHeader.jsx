import YouTubeFrame from "../YouTubeFrame/YouTubeFrame";
import "./RecipeHeader.css";
import { FavoritesContext } from "../../context/FavoritesContext";
import { useContext } from "react";

export default function RecipeHeader({ title, youtubeUrl, imgSrc, tags, id, category }) {
    const { addFavorite, favorites } = useContext(FavoritesContext);
    const { removeFavorite } = useContext(FavoritesContext);
    const isAddedToFavorites = favorites.find(fav => fav.idMeal === id);

    const handleToggleFavorite = () => {
        isAddedToFavorites ? removeFavorite(id) :
        addFavorite({ 
            idMeal: id,
            strMeal: title,
            strMealThumb: imgSrc,
            strCategory: category
        });
    };

    return (
        <div className="recipe_header">
            {youtubeUrl ? (
                <YouTubeFrame youtubeUrl={youtubeUrl} />
            ) : (
                <img src={imgSrc} alt={title} className="recipe_image" />
            )}
            <div className="recipe_tags">
                {tags &&
                    tags.split(",").map((tag, index) => (
                        <span key={index} className="tag_item">
                            {tag.trim()}
                        </span>
                    ))}
            </div>
            <div className="title_container">
                <h1 className="recipe_header_title">{title}</h1>
                <button
                    className="add_to_favorites"
                    onClick={handleToggleFavorite}
                >
                    {isAddedToFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
}
