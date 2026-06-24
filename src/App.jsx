import { useState } from "react"

function App() {
    let [query, setQuery] = useState("")
    let [movies, setMovies] = useState([])
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState("")

    async function searchMovies() {
    setLoading(true)
    setError("")
    let response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${import.meta.env.VITE_OMDB_KEY}`)
    let data = await response.json()
    if (data.Response === "False") {
        setError(data.Error)
        setMovies([])
    } else {
        setMovies(data.Search)
    }
    setLoading(false)
}
return (
    <div>
        <h1>Movie Search</h1>
        <input
            type="text"
            placeholder="Search for a movie"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") searchMovies()
}}
        />
        <button onClick={searchMovies} disabled={loading}>
            {loading ? "Searching..." : "Search"}
        </button>
        {error && <p style={{color: "red"}}>{error}</p>}
        {movies.map((movie) => (
            <div key={movie.imdbID}>
              {movie.Poster !== "N/A" && <img src={movie.Poster} alt={movie.Title} width="100" />}
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
            </div>
        ))}
    </div>
)
}
export default App