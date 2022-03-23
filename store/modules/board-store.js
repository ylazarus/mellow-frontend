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
        getCurrBoard(state) {
            return state.boards.find(b => b._id === state.currBoard)
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
        setCurrBoard(state, { boardId }) {
            state.currBoard = boardId
        },
        saveGroup(state, { savedGroup }) {
            const idx = state.board.groups.findIndex(g => g.id === newGroup.id)
            if (idx === -1) state.board.groups.push(savedGroup)
            state.board.groups.splice(idx, 1, savedGroup)
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
        async saveGroup(context, { updatingGroup }) {
            var savedGroup;
            if (updatingGroup) {
                savedGroup = await boardService.save(updatingGroup)
                context.commit({ type: 'saveGroup', savedGroup })
            }
            else {
                savedGroup = await boardService.getEmptyGroup()
                context.commit({ type: 'saveGroup', savedGroup })
            }
            // return savedGroup
        }

    }
}
