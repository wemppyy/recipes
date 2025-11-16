import Header from "../components/Header/Header";
import RecipesList from "../components/RecipesList/RecipesList";
import RecipeCard from "../components/RecipeCard/RecipeCard";
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
            let searchData;
            let mealsArray = [];

            if (category) {
                searchData = await getMealsByCategory(category);
                mealsArray = searchData?.meals || [];
            } else {
                mealsArray = await searchAllMeals(searchQuery);
            }

            const mealsList = [];
            if (mealsArray && mealsArray.length > 0) {
                for (const meal of mealsArray) {
                    mealsList.push(
                        <RecipeCard
                            key={meal.idMeal}
                            urlId={meal.idMeal}
                            imgSrc={meal.strMealThumb}
                            imgAlt={meal.strMeal}
                            category={category || meal.strCategory}
                            title={meal.strMeal}
                        />
                    );
                }
            } else {
                console.log("No meals found");
            }
            setMeals(mealsList);
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
                    searchQuery={searchQuery}
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
