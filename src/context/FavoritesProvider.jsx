import { useEffect, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (meal) => {
        setFavorites((prevFavorites) => {
            if (!prevFavorites.find((fav) => fav.idMeal === meal.idMeal)) {
                console.log("Adding to favorites:", meal);
                return [...prevFavorites, meal];
            }
            console.log("Meal already in favorites:", meal);
            
            return prevFavorites;
        });
    };

    const removeFavorite = (mealId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.idMeal !== mealId)
        );
        console.log("Removing from favorites:", mealId);
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}
