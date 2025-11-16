import "./Categories.css";
import { Link } from "react-router-dom";

export default function Categories({ CategoriesList, count }) {
    return (
        <div className="categories_container">
            {Object.entries(CategoriesList)
                .slice(0, count)
                .map(([title, img]) => (
                    <Link to={`/catalog/${title}`} className="category_link" key={title}>
                        <div key={title} className="category_card">
                            <img
                                src={img}
                                alt={title}
                                className="category_image"
                            />
                            <div className="category_title">{title}</div>
                        </div>
                    </Link>
                ))}
        </div>
    );
}
