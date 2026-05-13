import { useState } from "react"
import "./HitList.css"
import { FiHeart, FiStar } from "react-icons/fi"
import { FaHeart, FaSistrix } from "react-icons/fa"
import logo from "../assets/ClaimedLogo.png"
import { useHitList } from "../context/HitListContext"
import { useToast } from "../context/ToastContext"

function HitList() {
    const { hitlist, removeFromHitList, addToHitList, isInHitList } = useHitList()
    const [searchQuery, setSearchQuery] = useState("")
    const { showToast } = useToast()

    const filteredResults = hitlist.filter((item) =>
        item.displayName?.text?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="page">
            <div className="container">
                <img src={logo} className="logo" alt="Claimed" />

                <div className="searchWrapper">
                    <input
                        className="searchInput"
                        value={searchQuery}
                        placeholder="Search Hit List"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button className="searchButton">
                        <FaSistrix className="searchIcon" />
                    </button>
                </div>
            </div>

            <div className="resultsGrid">
                {filteredResults.map((item) => (
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

export default HitList