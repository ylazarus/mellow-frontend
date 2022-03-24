import { boardService } from "../../src/services/board-service"
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
        // favoriteBoards({ boards }) {
        //     const favoriteBoards = JSON.parse(JSON.stringify(boards))
        //     console.log(favoriteBoards);
        // },
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
            state.currBoard = JSON.parse(JSON.stringify(board))
        },
        setFavorite(state, { updatedBoard }) {
            const boardIdx = state.boards.findIndex(board => board._id === updatedBoard._id)
            // console.log(boardIdx);
            state.boards.splice(boardIdx, 1, updatedBoard)
            console.log(state.boards);
            // console.log('updatedBoard', updatedBoard);
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
            state.boards.splice(idx, 1, savedBoard)
        },
        saveGroup(state, { boardId, group }) {
            const updatingBoard = state.boards.find(b => b._id === boardId)
            const idx = updatingBoard.groups.findIndex(g => g.id = group.id)
            if (idx === -1) return updatingBoard.groups.push(group)
            updatingBoard.groups.splice(idx, 1, group)
            state.currBoard = updatingBoard
        },
        saveTask(state, { boardId, groupId, task }) {
            console.log(boardId, groupId, task);
            const updatingBoard = state.boards.find(b => b._id === boardId)
            const updatingGroup = updatingBoard.groups.find(g => g.id === groupId)
            console.log(updatingGroup);
            const idx = updatingGroup.tasks.findIndex(t => t.id === task.id)
            console.log(idx);
            if (idx === -1) return updatingGroup.tasks.push(task)
            updatingGroup.tasks.splice(idx, 1, task)
            state.currBoard = updatingBoard
        }
    },
    actions: {
        async loadBoards({ commit }) {
            try {
                const boards = await boardService.query()
                commit({ type: "setBoards", boards })
            } catch (err) {
                console.log("board module loadBoards cant load boards now", err)
            }
        },
        async loadBoard({ commit }, { boardId }) {
            try {
                const board = await boardService.getById(boardId)
                commit({ type: 'setCurrBoard', board })
                return JSON.parse(JSON.stringify(board))
            } catch (err) {
                console.log("board module loadBoard cant load board now", err)
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
        async toggleFavorite({ commit }, { board }) {
            try {
                const boardToUpdate = await boardService.getById(board.boardId)
                boardToUpdate.isFavorite = board.status
                const updatedBoard = await boardService.save(boardToUpdate)
                commit({ type: "setFavorite", updatedBoard })

            } catch (err) {
                console.log("board module toggleFavorite cant load boards now", err)
            }
        },
        async saveBoard({ commit }, { board }) {
            try {
                const savedBoard = await boardService.save(board)
                commit({ type: 'saveBoard', savedBoard })
                return JSON.parse(JSON.stringify(savedBoard))
            } catch (err) {
                console.log("board module saveBoard cant save board now", err)
            }
        },
        async attachImg({ commit }, { ev }) {
            const img = await boardService.uploadImg(ev)
            return img
        },
        async saveTask({ commit, state }, { boardId, groupId, task, activity }) {
            await commit({ type: 'saveTask', boardId, groupId, task })
            const savedBoard = await boardService.save(JSON.parse(JSON.stringify(state.currBoard)))
            return savedBoard
        },
        async saveGroup({ commit, state }, { boardId, group, activity }) {
            await commit({ type: 'saveGroup', boardId, group })
            const savedBoard = await boardService.save(JSON.parse(JSON.stringify(state.currBoard)))
            return savedBoard
        },
    }
}
