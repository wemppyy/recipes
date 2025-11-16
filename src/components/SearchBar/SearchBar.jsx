import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ searchQuery, onSearch }) {
    const [query, setQuery] = useState(searchQuery);

    return (
        <form
            className="search_bar"
            onSubmit={(e) => {
                e.preventDefault();
                onSearch(query);
            }}
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes..."
                className="search_input"
            />
            <button className="search_button" type="submit">
                Search
            </button>
        </form>
    );
}
