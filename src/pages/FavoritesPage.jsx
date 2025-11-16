import Header from "../components/Header/Header"
import FavoritesList from "../components/FavoritesList/FavoritesList"
import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"
import Title from "../components/Title/Title"

export default function FavoritesPage() {
    const { favorites } = useContext(FavoritesContext);

    return (
        <>
            <Header />
            <Title text="Your Favorite Recipes" />
            <FavoritesList favoritesList={favorites} />
        </>
    )
}