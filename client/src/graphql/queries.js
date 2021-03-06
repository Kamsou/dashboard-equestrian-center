import { HOSTNAME } from '../config/keys'

const getLessons = async (state) => {

  state.isLoading = true

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      query: `{
        lessons {
          id,
          name,
          level,
          schedule,
          coach,
          training_place
        }
      }`
    })
  }
  const response = await fetch(HOSTNAME, options)
  const text = await response.text()
  const jsonRes = JSON.parse(text)

  state.isLoading = false

  return jsonRes.data.lessons
}

export { getLessons }