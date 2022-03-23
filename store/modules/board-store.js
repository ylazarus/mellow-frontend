import { boardService } from '../../services/board-service'
// should be boardService

export default {
    state: {
        boards: [],
        currBoard: null,
    },
    getters: {
        boards({ boards }) {
            return JSON.parse(JSON.stringify(boards))
        },
        favoriteBoards({ boards }) {
            const favoriteBoards = JSON.parse(JSON.stringify(boards))
            console.log(favoriteBoards);
        },
        getCurrBoard({ currBoard }) {
            return JSON.parse(JSON.stringify(currBoard))
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        setCurrBoard(state, { board }) {
            
            state.currBoard = board
        },
        // saveGroup(state, { updatingGroup }) {
        //     if (updatingGroup) {
        //         const idx = state.currBoard.groups.findIndex(g => g.id === updatingGroup.id)
        //         state.currBoard.groups.splice(idx, 1, savedGroup)
        //     }
        //     else {
        //         const newGroup = boardService.getEmptyGroup()
        //         state.currBoard.groups.push(newGroup)
        //     }
        //     this.dispatch({ type: 'saveBoard', board: state.currBoard })
        // },
        saveBoard(state, { savedBoard }) {
            const idx = state.boards.findIndex(b => b._id === savedBoard._id)
        }
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
        async loadBoard({commit}, {boardId}){
          const board =  await boardService.getById(boardId)
          commit ({type: 'setCurrBoard', board})
          return board
        },
        async addBoard({ commit }) {
            try {
                const title = prompt('Enter board title')
                const board = await boardService.getEmptyBoard(title);
                commit({ type: "addBoard", board })
                return board._id
            } catch (err) {
                console.log("board module addBoard cant load boards now", err)
            }
        },
        async removeBoard({ commit }, { boardId }) {
            try {
                await boardService.remove(boardId);
                commit({ type: "removeBoard", boardId })

            } catch (err) {
                console.log("board module removeBoard cant load boards now", err)
            }
        },
        async toggleFavorite({ commit }, { boardId }) {
            try {
                await boardService.save(boardId);
                commit({ type: "removeBoard", boardId })

            } catch (err) {
                console.log("board module removeBoard cant load boards now", err)
            }
        },
        async saveBoard({ commit }, { board }) {
            try {
                const savedBoard = await boardService.save(board)
                commit({ type: 'saveBoard', savedBoard })
                return savedBoard
            } catch (err) {
                console.log("board module saveBoard cant save board now", err)
            }
        },
        // async saveGroup({state, commit}, { updatingGroup }) {
        //     var savedGroup;
        //     if (updatingGroup) {
        //         savedGroup = await boardService.save(updatingGroup)
        //         commit({ type: 'saveGroup', savedGroup })
        //     }
        //     else {
        //         console.log();
        //         savedGroup = boardService.getEmptyGroup()
        //         console.log('add', savedGroup);
        //         commit({ type: 'saveGroup', savedGroup })
        //     }
        //     // return savedGroup
        // }
    }
}
