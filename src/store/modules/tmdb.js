import Api from '../../axios'

export default {
  namespaced: true,
  state: {
    urlPath: '',
    genres: [],
    movie: {},
    tvShow: {},
    actor: '',
    social: '',
    credits: ''
  },
  mutations: {
    SET_MOVIE(state,payload) {
      state.movie = payload
    },
    SET_TV_SHOW(state,payload) {
      state.tvShow = payload
    },
    SET_GENRES(state,payload) {
      state.genres = payload
    },
    SET_PATH(state, payload) {
      state.urlPath = payload
    },
    SET_ACTOR(state, payload) {
      state.actor = payload
    },
    SET_SOCIAL(state, payload) {
      state.social = payload
    },
    SET_CREDITS(state, payload) {
      state.credits = payload
    }
  },

  actions: {
    getActor({commit, dispatch}, id) {
      return new Promise((resolve => {
        commit('SET_PATH', 'person/'+id)
        dispatch('getData')
          .then((res) => {
            commit('SET_ACTOR', res)
            // console.log(res)
            commit('SET_PATH', 'person/'+id+'/external_ids')
            dispatch('getData')
              .then((res) => {
                commit('SET_SOCIAL', res)
                // console.log(res)
                commit('SET_PATH', 'person/'+id+'/movie_credits')
                dispatch('getData')
                  .then((res) => {
                    commit('SET_CREDITS', res)
                    resolve(true)
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      }))
    },

    getSearchResults({commit, dispatch}, search) {
      commit('SET_PATH', 'search/movie?query='+search)
      return new Promise((resolve => {
        dispatch('getData')
          .then((res) => {
            resolve(res.results.slice(0,10))
          })
          .catch(err => {
            console.log(err)
          })
      }))
    },

    getMovie({commit, dispatch}, id) {
      commit('SET_PATH', 'movie/'+id+'?append_to_response=credits,videos,images')
      return new Promise((resolve => {
        dispatch('getData')
          .then((res) => {
            commit('SET_MOVIE', res)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
          })
      }))
    },

    getTvShow({commit, dispatch}, id) {
      commit('SET_PATH', 'tv/'+id+'?append_to_response=credits,videos,images')
      return new Promise((resolve => {
        dispatch('getData')
          .then((res) => {
            commit('SET_TV_SHOW', res)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
          })
      }))
    },

    getGenres({commit, dispatch}) {
      commit('SET_PATH', 'genre/movie/list')
      dispatch('getData')
        .then((res) => {
          commit('SET_GENRES', res.genres)
        })
        .catch(err => {
          console.log(err)
        })
    },

    getDataFromTMDB({commit, dispatch}, payload) {
      commit('SET_PATH', payload.path+'?page='+payload.page)
      return new Promise((resolve => {
        dispatch('getData')
          .then((res) => {
            resolve(res.results)
          })
          .catch(err => {
            console.log(err)
          })
      }))
    },

    getData({state}) {
      return new Promise((resolve, reject) => {
        Api.get(state.urlPath, {
          headers: {
            'Authorization': 'Bearer ' + process.env.VUE_APP_TMDB_TOKEN
          }
        })
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
}
