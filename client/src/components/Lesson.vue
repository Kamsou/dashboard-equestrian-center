<script>
import { reactive, onMounted } from 'vue'
import { getLessons } from '../graphql/queries'
import { addLesson, deleteLesson, updateLesson } from '../graphql/mutations'

export default {
  setup() {
    const state = reactive({
      lesson: {
        id: null,
        name: null,
        coach: null,
        training_place: null,
        level: null,
        schedule: null,
      },
      lessonList: [],
      update: false,
      isLoading: false,
    })

    onMounted(async () => {
      const allLessons = await getLessons(state)
      state.lessonList = allLessons
    })

    const addNewLesson = async (e) => {
      e.preventDefault()


      if(
        state.lesson.name === null ||
        state.lesson.coach === null ||
        state.lesson.training_place === null ||
        state.lesson.level === null ||
        state.lesson.schedule === null
      ) {
        return
      }

      if (state.update) {
        await updateLesson(state, state.lesson.id)
      } else {
        await addLesson(state)
      }

      const allLessons = await getLessons(state)
      state.lessonList = allLessons
      state.lesson = { id: null, name: null, coach: null, training_place: null, level: null, schedule: null } 
      state.update = false
    }

    const removeLesson = async (e, id) => {
      e.preventDefault()
      await deleteLesson(state, id)
      const allLessons = await getLessons(state)
      state.lessonList = allLessons
    }

    const editLesson = async (e, id) => {
      e.preventDefault()
      const selectedLesson = state.lessonList.filter((lesson) => lesson.id === id)[0]
      state.lesson.id = selectedLesson.id
      state.lesson.name = selectedLesson.name
      state.lesson.coach = selectedLesson.coach
      state.lesson.training_place = selectedLesson.training_place
      state.lesson.level = selectedLesson.level
      state.lesson.schedule = selectedLesson.schedule
      state.update = true

      const allLessons = await getLessons(state)
      state.lessonList = allLessons
    }

    return { state, addNewLesson, removeLesson, editLesson }
  }
}
</script>

<template>
  <div class="container mx-auto mt-5">
    <div>
      <h2 v-if="!state.update" class="font-bold pl-2 md:pl-0">Créer un cours</h2>
      <h2 v-else class="font-bold pl-2 md:pl-0">Modifier un cours</h2>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="name">
              Nom du cours
            </label>
            <input 
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-blue-800 rounded py-3 px-4 mb-3"
              id="name"
              type="text"
              v-model="state.lesson.name"
              placeholder="Cours d'équitation"
            >
          </div>
          <div class="md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="coach">
              Coach
            </label>
            <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="coach"
              type="text"
              v-model="state.lesson.coach"
              placeholder="Maxime"
            >
          </div>
        </div>
        <div class="-mx-3 md:flex mb-2">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="training_place">
              Lieu du cours
            </label>
            <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="training_place"
              type="text"
              v-model="state.lesson.training_place"
              placeholder="Manège"
            >
          </div>
          <div class="md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="level">
              Niveau
            </label>
            <div class="relative">
              <select
                v-model="state.lesson.level"
                class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="level"
              >
                <option>Galop 1</option>
                <option>Galop 2</option>
                <option>Galop 3</option>
                <option>Galop 4</option>
                <option>Galop 5</option>
                <option>Galop 6</option>
                <option>Galop 7</option>
              </select>
              <div class="pointer-events-none absolute top-2/4 right-0 pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div class="md:w-1/2 px-3 pt-4 md:pt-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="schedule">
              Horaire
            </label>
            <input
              v-model="state.lesson.schedule"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="schedule"
              type="text"
              placeholder="10:00"
            >
          </div>
        </div>
        <button v-if="!state.update" @click="addNewLesson" class="bg-blue-600 disabled text-white py-2 px-8 mt-8 rounded hover:bg-blue-500 transition-all duration-300 mx-auto">
          Valider
        </button>
        <button v-else @click="addNewLesson" class="bg-blue-600 text-white py-2 px-8 mt-8 rounded hover:bg-blue-500 transition-all duration-300 mx-auto">
          Modifier
        </button>
      </div>
    </div>
    <div>
      <h2 class="font-bold pl-2 md:pl-0">Tous les cours</h2>
      <div class="block p-4 mt-4 md:flex md:p-0">
        <article
          v-for="(item, i) in state.lessonList"
          :key="i"
          class="bg-white mb-4 flex flex-wrap w-full mx-auto overflow-hidden rounded-lg shadow md:w-3/12 md:mr-4 md:mx-0"
        >
          <img
            src="https://www.weblex.fr/images/flux_actus/poney2.jpg"
            alt="Dr. Zoidberg holding out his claws"
          />
          <div class="px-4 py-6 w-full">
            <h2 class="font-bold text-2xl">{{ item.name }}</h2>
            <dl class="flex flex-wrap">
              <div class="mr-2">
                <dt class="font-bold mt-2">Niveau</dt>
                <dd>{{ item.level }}</dd>
              </div>
              <div class="mr-2">
                <dt class="font-bold mt-2">Lieu</dt>
                <dd>{{ item.training_place }}</dd>
              </div>
              <div class="mr-2">
                <dt class="font-bold mt-2">Horaire</dt>
                <dd>{{ item.schedule }}</dd>
              </div>
              <div class="mr-2">
                <dt class="font-bold mt-2">Coach</dt>
                <dd>{{ item.coach }}</dd>
              </div> 
            </dl>
          </div>
          <div class="flex flex-wrap w-full justify-evenly mb-4">
            <button
              @click="(e) => removeLesson(e, item.id)"
              class="w-full mx-2 border border-blue-600 text-blue-600 font-montserrat py-2 px-8 font-medium rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Supprimer
            </button>
            <button
              @click="(e) => editLesson(e, item.id)"
              class="w-full mx-2 my-2 bg-blue-600 text-white font-montserrat py-2 px-8 font-medium rounded hover:bg-blue-500 transition-all duration-300"
            >
              Modifier
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
