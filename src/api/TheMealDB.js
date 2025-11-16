const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function request(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

let cachedAllMeals = null;
let loadingPromise = null;

export async function searchAllMeals(query) {
    const allMeals = await getAllMeals();

    if (!query || query.trim() === "") {
        return allMeals;
    }

    const lowerQuery = query.toLowerCase();
    return allMeals.filter(meal =>
        meal.strMeal.toLowerCase().includes(lowerQuery)
    );
}

export async function getAllMeals() {
    if (cachedAllMeals) return cachedAllMeals;

    if (loadingPromise) return loadingPromise;

    loadingPromise = (async () => {
        try {
            const categoriesData = await getCategories();
            const categories = categoriesData?.categories || [];

            const promises = categories.map(cat =>
                fetch(`${BASE_URL}/filter.php?c=${cat.strCategory}`)
                    .then(res => res.json())
                    .then(data => {
                        const meals = data?.meals || [];
                        return meals.map(meal => ({
                            ...meal,
                            strCategory: cat.strCategory
                        }));
                    })
            );

            const results = await Promise.all(promises);
            const allMeals = results.flat();

            cachedAllMeals = allMeals;
            loadingPromise = null;
            
            return allMeals;
        } catch (error) {
            loadingPromise = null;
            throw error;
        }
    })();

    return loadingPromise;
}

export function getMealById(id) {
    return request(`lookup.php?i=${id}`);
}

export function getCategories() {
    return request('categories.php');
}

export function getMealsByCategory(category) {
    return request(`filter.php?c=${category}`);
}

export function getRandomMeal() {
    return request('random.php');
}