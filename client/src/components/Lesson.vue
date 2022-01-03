<script>
import { reactive, onMounted } from 'vue'
import { getLessons } from '../graphql/queries'

export default {
  setup() {
    const state = reactive({
      lesson: {
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

    return { state }
  }
}
</script>

<template>
  <div class="container mx-auto mt-5">
    <div>
      <h2 class="font-bold">Créer un cours</h2>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
              Nom du cours
            </label>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-blue-800 rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Cours d'équitation">
          </div>
          <div class="md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
              Coach
            </label>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Maxime">
          </div>
        </div>
        <div class="-mx-3 md:flex mb-2">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
              Lieu du cours
            </label>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-city" type="text" placeholder="Manège">
          </div>
          <div class="md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
              Niveau
            </label>
            <div class="relative">
              <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state">
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
          <div class="md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
              Horaire
            </label>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="text" placeholder="10:00">
          </div>
        </div>
        <button class="bg-blue-600 text-white py-2 px-8 mt-8 rounded hover:bg-blue-500 transition-all duration-300 mx-auto">
          Valider
        </button>
      </div>
    </div>
    <div>
      <h2 class="font-bold">Tous les cours</h2>
      <div class="flex mt-4">
        <article
          v-for="(item, i) in state.lessonList"
          :key="i"
          class="bg-white flex flex-col max-w-xs mx-auto overflow-hidden rounded-lg shadow"
        >
          <img
            src="https://www.weblex.fr/images/flux_actus/poney2.jpg"
            alt="Dr. Zoidberg holding out his claws"
          />
          <div class="px-4 py-6">
            <h2 class="font-bold text-2xl">{{ item.name }}</h2>
            <dl class="flex flex-row">
              <div class="w-1/2">
                <dt class="font-bold mt-2">Niveau</dt>
                <dd>{{ item.level }}</dd>
              </div>
              <div class="w-1/2">
                <dt class="font-bold mt-2">Lieu</dt>
                <dd>{{ item.training_place }}</dd>
              </div>
              <div class="w-1/2">
                <dt class="font-bold mt-2">Horaire</dt>
                <dd>{{ item.schedule }}</dd>
              </div>
              <div class="w-1/2">
                <dt class="font-bold mt-2">Coach</dt>
                <dd>{{ item.coach }}</dd>
              </div> 
            </dl>
          </div>
          <div class="flex justify-evenly mb-4">
            <button class="border border-blue-600 text-blue-600 font-montserrat py-2 px-8 font-medium rounded hover:bg-blue-600 hover:text-white transition-all duration-300">Supprimer</button>
            <button class="bg-blue-600 text-white font-montserrat py-2 px-8 font-medium rounded hover:bg-blue-500 transition-all duration-300">Modifier</button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
