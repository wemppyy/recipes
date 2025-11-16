import "./RecipesShortList.css";

export default function RecipesShortList({RecipesList}) {
    return (
        <div className="recipes_short_list">
            {RecipesList}
        </div>
    );
}