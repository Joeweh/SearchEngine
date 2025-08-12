import './App.css';
import { useState } from 'react';

function App() {
    const [searchResults, setSearchResults] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        if (formData.get('searchQuery') === '') {
            return;
        }

        const params = new URLSearchParams(formData);

        const fullUrl = `${form.action}?${params.toString()}`;

        const response = await fetch(fullUrl, {
            method: form.method,
        });

        const data = await response.json();

        setSearchResults(data);
    }

    return (
        <>
            <h2 className="centeredHeading">Patent Database</h2>
            <form id="searchForm" method="GET" action="http://localhost:5000/search" onSubmit={handleSubmit}>
                <select className="searchType" name="searchType">
                    <option value="title">Title</option>
                    <option value="doc_number">Doc #</option>
                    <option value="classification">Classification</option>
                    <option value="abstract">Abstract</option>
                    <option value="description">Description</option>
                </select>
                <input className="searchBar" type="text" name="searchQuery" placeholder="Search Database"></input>
                <button className="searchButton" type="submit">Search</button>
            </form>
            <div className="searchResultContainer">
                {searchResults !== null && (
                    searchResults.length === 0
                        ? <h2 className="centeredHeading">No results found</h2>
                        : searchResults.map(result => (
                            <SearchResult key={result.doc_number} patent={result} />
                        ))
                )}
            </div>
        </>
    )
}

function SearchResult({ patent }) {
    return (
        <div className="searchResult">
            <h2>{patent.title}</h2>
            <h3>#{patent.doc_number}</h3>
            <h3>{patent.classification}</h3>
            <div className="contentContainer">
                <details open>
                    <summary><strong>Abstract</strong></summary>
                    {patent.abstract}
                </details>
                {patent.description && patent.description.length > 0 && patent.description[0] !== '' ? (
                    <details>
                        <summary><strong>Description</strong></summary>
                        {patent.description.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </details>
                ) : (
                    <p style={{ margin: 0 }}><strong>No description</strong></p>
                )}
            </div>
        </div>
    );
}

export default App
