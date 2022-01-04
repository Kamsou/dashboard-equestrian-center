import { HOSTNAME } from '../config/keys'

const addLesson = async (state) => {

  state.isLoading = true

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation {
          addLesson(name: "${state.lesson.name}", level: "${state.lesson.level}", schedule: "${state.lesson.schedule}", coach: "${state.lesson.coach}", training_place: "${state.lesson.training_place}") {
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
  await fetch(HOSTNAME, options)

  state.isLoading = false
}

const deleteLesson = async (state, id) => {

  state.isLoading = true

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation {
          deleteLesson(id: "${id}") {
            name,
          }
      }`
    })
  }
  await fetch(HOSTNAME, options)

  state.isLoading = false
}

const updateLesson = async (state, id) => {

  state.isLoading = true

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation {
          updateLesson(id: "${id}", name: "${state.lesson.name}", level: "${state.lesson.level}", schedule: "${state.lesson.schedule}", coach: "${state.lesson.coach}", training_place: "${state.lesson.training_place}") {
            name,
            level,
            schedule,
            coach,
            training_place
          }
      }`
    })
  }
  await fetch(HOSTNAME, options)

  state.isLoading = false
}

export { addLesson, deleteLesson, updateLesson }