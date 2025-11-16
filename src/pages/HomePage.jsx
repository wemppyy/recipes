import Header from "../components/Header/Header";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import Title from "../components/Title/Title";
import RecipesShortList from "../components/RecipesShortList/RecipesShortList";
import {
    getRandomMeal,
    getCategories,
    getMealsByCategory,
} from "../api/TheMealDB";
import { useEffect, useState } from "react";
import Categories from "../components/Categories/Categories";

export default function HomePage() {
    const [randomMeals, setRandomMeals] = useState([]);
    const [categoryMeals, setCategoryMeals] = useState([]);
    const [randomCategory, setRandomCategory] = useState("");
    const [categoriesList, setCategoriesList] = useState({});
    const [shortListCount] = useState(4);
    const [categoriesListCount] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const randomMeals = [];

            for (let i = 0; i < shortListCount; i++) {
                const randomMeal = await getRandomMeal();
                if (randomMeal?.meals) {
                    randomMeals.push(
                        <RecipeCard
                            urlId={randomMeal.meals[0].idMeal}
                            imgSrc={randomMeal.meals[0].strMealThumb}
                            imgAlt={randomMeal.meals[0].strMeal}
                            category={randomMeal.meals[0].strCategory}
                            title={randomMeal.meals[0].strMeal}
                        />
                    );
                }
            }

            const categoriesData = await getCategories();
            if (categoriesData?.categories) {
                const randomIndex = Math.floor(
                    Math.random() * categoriesData.categories.length
                );
                const selectedCategory =
                    categoriesData.categories[randomIndex].strCategory;
                setRandomCategory(selectedCategory);
                const categoriesList = {};
                for (const category of categoriesData.categories) {
                    categoriesList[category.strCategory] =
                        category.strCategoryThumb;
                }
                setCategoriesList(categoriesList);

                const categoryData = await getMealsByCategory(selectedCategory);
                const categoryMeals = [];

                if (categoryData?.meals) {
                    const mealsToShow = categoryData.meals.slice(
                        0,
                        shortListCount
                    );
                    for (const meal of mealsToShow) {
                        categoryMeals.push(
                            <RecipeCard
                                urlId={meal.idMeal}
                                imgSrc={meal.strMealThumb}
                                imgAlt={meal.strMeal}
                                category={selectedCategory}
                                title={meal.strMeal}
                            />
                        );
                    }
                }

                setCategoryMeals(categoryMeals);
            }

            setRandomMeals(randomMeals);
            setLoading(false);
        }
        load();
    }, [shortListCount]);

    return (
        <>
            <Header />
            <Title text="Recommended Recipes" />
            {loading ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                    Loading recipes...
                </div>
            ) : (
                <RecipesShortList RecipesList={randomMeals} />
            )}
            <Title text="Popular Categories" />
            {loading ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                    Loading categories...
                </div>
            ) : (
                <Categories CategoriesList={categoriesList} count={categoriesListCount} />
            )}
            <Title text={`${randomCategory} Recipes`} />
            {loading ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                    Loading recipes...
                </div>
            ) : (
                <RecipesShortList RecipesList={categoryMeals} />
            )}
            {/* <Title text="Favorite Recipes" /> */}
            {/* <RecipesShortList RecipesList={items} /> */}
        </>
    );
}
