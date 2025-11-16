import FavoriteCard from "../FavoriteCard/FavoriteCard";
import "./FavoritesList.css";

export default function FavoritesList({ favoritesList }) {
    return (
        <div className="favorites_list">
            {favoritesList.length === 0 ? (
                <p>No favorite recipes added yet.</p>
            ) : (
                favoritesList.map((favorite) => (
                    <FavoriteCard favorite={favorite} />
                ))
            )}
        </div>
    );
}
