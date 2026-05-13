import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import "./Search.css"
import { FiHeart, FiStar } from "react-icons/fi"
import { FaHeart, FaSistrix } from "react-icons/fa"
import logo from "../assets/ClaimedLogo.png"
import { useHitList } from "../context/HitListContext"

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "")
    const [results, setResults] = useState([])
    const { addToHitList, removeFromHitList, isInHitList } = useHitList()

    const searchRestaurants = async (overrideQuery) => {
        const q = (overrideQuery ?? searchQuery).trim()
        if (!q) return

        try {
            const response = await fetch(
                "https://places.googleapis.com/v1/places:searchText",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Goog-Api-Key": API_KEY,
                        "X-Goog-FieldMask": [
                            "places.id",
                            "places.displayName",
                            "places.formattedAddress",
                            "places.rating",
                            "places.types"
                        ].join(","),
                    },
                    body: JSON.stringify({ textQuery: q }),
                }
            )

            if (!response.ok) {
                console.log("Status", response.status)
                const errText = await response.text()
                console.log("Body", errText)
                return
            }

            const data = await response.json()
            console.log('data: ', data);

            const allowed = ["restaurant", "cafe", "bar", "meal_takeaway", "meal_delivery"]

            const filtered = (data.places ?? []).filter((p) =>
                p.types?.some((t) => allowed.includes(t))
            )

            setResults(filtered)
        } catch (e) {
            console.error(e)
        }
    }

    const handleSearch = () => {
        if (!searchQuery.trim()) return
        setSearchParams({ query: searchQuery })
    }

    useEffect(() => {
        const q = searchParams.get("query")
        if (q) {
            setSearchQuery(q)
            searchRestaurants(q)
        }
    }, [searchParams])

    return (
        <div className="page">
            <div className="container">
                <img src={logo} className="logo" alt="Claimed" />

                <div className="searchWrapper">
                    <input
                        className="searchInput"
                        placeholder="Find your next favourite spot"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />

                    <button className="searchButton" onClick={handleSearch}>
                        <FaSistrix className="searchIcon" />
                    </button>
                </div>
            </div>

            <div className="resultsGrid">
                {results.map((item) => (
                    <div key={item.id} className="card">
                        <div className="cardHeader">
                            <div className="cardTitle">{item.displayName?.text}</div>

                            <button
                                className="heartButton"
                                onClick={() =>
                                    isInHitList(item.id)
                                        ? removeFromHitList(item.id)
                                        : addToHitList(item)
                                }
                            >
                                {isInHitList(item.id) ? (
                                    <FaHeart className="heartFilled" />
                                ) : (
                                    <FiHeart className="heartOutline" />
                                )}
                            </button>
                        </div>

                        <div className="cardSubtitle">{item.formattedAddress}</div>

                        {item.rating && (
                            <div className="cardRating">
                                <span>{item.rating.toFixed(1)}</span>
                                <FiStar className="starIcon" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search