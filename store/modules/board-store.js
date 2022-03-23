import { boardService } from '../../services/board-service'
// should be boardService

export default {
    state: {
        boards: null,
    },
    getters: {
        boards({boards}){
            return JSON.parse(JSON.stringify(boards))
        }
    },
    mutations: {
        setBoards(state, {boards}){
            state.boards = boards
        },

    },
    actions: {
        async loadBoards({ commit, state }) {
            try {
              const boards = await boardService.query()
              commit({ type: "setBoards", boards })
            } catch (err) {
              console.log("board module loadBoards cant load boards now", err)
            }
          },
    }
}
