import './RecipesList.css'

export default function RecipesList({
	recipeList,
	searchQuery = '',
	itemsPerPage = 12,
	page = 1
}) {
	const startIndex = (page - 1) * itemsPerPage
	const endIndex = page * itemsPerPage

	const recipesToRender = recipeList.slice(startIndex, endIndex).map(recipe => (
		<div
			key={recipe.props.id}
			className="recipe_item"
		>
			{recipe}
		</div>
	))

	return (
		<>
			<div className="recipes_list">{recipesToRender}</div>
		</>
	)
}
