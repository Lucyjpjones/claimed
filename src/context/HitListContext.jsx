import { createContext, useContext, useState } from "react"
import { generateMockAvailability } from "../utils/availability"

const HitListContext = createContext()

export function HitListProvider({ children }) {
  const [hitlist, setHitlist] = useState([])

  const addToHitList = (place) => {
    setHitlist((prev) => {
      if (prev.find((p) => p.id === place.id)) return prev

      const enrichedPlace = {
        ...place,
        availability: generateMockAvailability(),
      }

      return [...prev, enrichedPlace]
    })
  }

  const removeFromHitList = (placeId) => {
    setHitlist((prev) => prev.filter((p) => p.id !== placeId))
  }

  const isInHitList = (placeId) => {
    return hitlist.some((p) => p.id === placeId)
  }

  return (
    <HitListContext.Provider
      value={{ hitlist, addToHitList, removeFromHitList, isInHitList }}
    >
      {children}
    </HitListContext.Provider>
  )
}

export function useHitList() {
  return useContext(HitListContext)
}