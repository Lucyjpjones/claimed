export const generateMockAvailability = () => {
  const today = new Date()
  const data = {}

  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(today.getDate() + i)

    const key = d.toISOString().split("T")[0]

    data[key] = [
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "21:00",
    ]
  }

  return data
}