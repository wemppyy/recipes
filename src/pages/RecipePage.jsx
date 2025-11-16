import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import { getMealById, getMealsByCategory } from "../api/TheMealDB";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeScript } from "../components/RecipeScript/RecipeScript";
import RecipeHeader from "../components/RecipeHeader/RecipeHeader";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import RecipesShortList from "../components/RecipesShortList/RecipesShortList";

export default function RecipePage() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categoryMeals, setCategoryMeals] = useState([]);

    useEffect(() => {
        async function load() {
            const mealData = await getMealById(id);
            if (mealData?.meals) {
                setMeal(mealData.meals[0]);

                const category = mealData.meals[0].strCategory;
                const categoryData = await getMealsByCategory(category);
                const categoryMeals = [];

                if (categoryData?.meals) {
                    const mealsToShow = categoryData.meals.slice(0, 3);
                    for (const meal of mealsToShow) {
                        categoryMeals.push(
                            <RecipeCard
                                urlId={meal.idMeal}
                                imgSrc={meal.strMealThumb}
                                imgAlt={meal.strMeal}
                                category={category}
                                title={meal.strMeal}
                            />
                        );
                    }
                }
                setCategoryMeals(categoryMeals);
            }
            setLoading(false);
        }
        load();
    }, [id]);

    return (
        <>
            <Header />
            <main style={{ padding: "0px 190px" }}>
                {loading ? (
                    <Title text="Loading..." />
                ) : meal ? (
                    <>
                        <RecipeHeader
                            id={meal.idMeal}
                            title={meal.strMeal}
                            youtubeUrl={meal.strYoutube}
                            imgSrc={meal.strMealThumb}
                            tags={meal.strTags}
                            category={meal.strCategory}
                        />
                        <RecipeScript text={meal.strInstructions} />
                        <Title text={`More ${meal.strCategory}`} />
                        <RecipesShortList RecipesList={categoryMeals} />
                    </>
                ) : (
                    <Title text="Meal not found" />
                )}
            </main>
        </>
    );
}
