import Header from "../components/Header/Header";
import RecipesList from "../components/RecipesList/RecipesList";
import Pagination from "../components/Pagination/Pagination";
import { searchAllMeals, getMealsByCategory } from "../api/TheMealDB";
import { useEffect, useState } from "react";
import Title from "../components/Title/Title";
import SearchBar from "../components/SearchBar/SearchBar";
import { useParams } from "react-router-dom";

export default function CatalogPage() {
    const [meals, setMeals] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const { category } = useParams();

    useEffect(() => {
        async function load() {
            setLoading(true);
            let mealsArray = [];

            if (category) {
                const searchData = await getMealsByCategory(category);
                mealsArray = (searchData?.meals || []).map(meal => ({...meal, strCategory: category}));
            } else {
                mealsArray = await searchAllMeals(searchQuery);
            }

            setMeals(mealsArray);
            setLoading(false);
        }
        load();
    }, [searchQuery, category]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <Header />
            {category ? (
                <Title text={`Category: ${category}`} />
            ) : (
                <Title text="Search Recipes" />
            )}

            {!category && (
                <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
            )}
            {loading ? (
                <Title text="Loading..." />
            ) : (
                <Title text={`Catalog - ${meals.length} recipes found`} />
            )}
            {loading ? null : (
                <RecipesList
                    recipeList={meals}
                    itemsPerPage={itemsPerPage}
                    page={currentPage}
                />
            )}
            <Pagination
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={Math.ceil(meals.length / itemsPerPage)}
            />
        </>
    );
}