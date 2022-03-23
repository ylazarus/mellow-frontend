import { storageService } from "./async-storage-service.js"
import { utilService } from "./util-service.js"
import axios from "axios"
axios.defaults.withCredentials = true

// const BOARD_URL = '//localhost:3030/api/board/'
const BOARD_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/board/'
    : '//localhost:3030/api/board/';
const KEY = "boards_db"

// _createBoards()

export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
}

async function query(filterBy) {
    //   const res = await axios.get(BOARD_URL, { params: filterBy })
    //   return res.data
    return storageService.query(KEY)
}

async function getById(boardId) {
    //   const res = await axios.get(BOARD_URL + boardId)
    //   return res.data
    return storageService.getById(KEY, boardId)
}

async function remove(boardId) {
    //   return axios.delete(BOARD_URL + boardId)
    return storageService.remove(KEY, boardId)
}

async function save(board) {
    //   if (board._id) {
    //     const res = await axios.put(BOARD_URL + board._id, board)
    //     return res.data
    //   } else {
    //     const res = await axios.post(BOARD_URL, board)
    //     return res.data
    //   }
    if (board._id) return storageService.put(KEY, board)
    return storageService.post(KEY, board)
}

function getEmptyGroup() {
    return {
        id: 'g-' + utilService.makeId(),
        title: 'Enter Group Name',
        tasks: [],
        style: {}
    }
}

function getEmptyTask() {
    return {
        id: 't-' + utilService.makeId(),
        title: '',
        createdAt: Date.now(),
        style: {}
    }

}

function getEmptyBoard(title) {

    const board = {
        title,
        createdAt: Date.now(),
        archivedAt: null,
        createdBy: {},
        style: {},
        labels: [], // when adding custom labels from a component we will add to this, otherwise base colors come from component
        members: [], // in component, add curr user to list
        groups: [],
        activities: [],
    }

    return storageService.post(KEY, board)
}

function _createBoards() {
    let boards = utilService.loadFromStorage(KEY)
    if (!boards || !boards.length) {
        boards = [
            {
                "_id": "b101",
                "title": "Robot dev proj",
                "isFavorite": false,
                "createdAt": Date.now(),
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": ""
                },
                "style": {},
                "labels": [
                    {
                        "id": "l101",
                        "title": "Done",
                        "color": "#61bd4f"
                    },
                    {
                        "id": "l102",
                        "title": "Progress",
                        "color": "#61bd33"
                    }
                ],
                "members": [
                    {
                        "_id": "u102a",
                        "fullname": "Tal Tarablus",
                        "imgUrl": ""
                    }
                ],
                "groups": [
                    {
                        "id": "g101",
                        "title": "Group 1",
                        "tasks": [
                            {
                                "id": "c101",
                                "title": "Replace logo"
                            },
                            {
                                "id": "c102",
                                "title": "Add Samples"
                            }
                        ],
                        "style": {}
                    },
                    {
                        "id": "g102",
                        "title": "Group 2",
                        "tasks": [
                            {
                                "id": "c103",
                                "title": "Do this"
                            },
                            {
                                "id": "c104",
                                "title": "Do that"
                            },

                        ],
                        "style": {}
                    }
                ],
                "activities": [
                    {
                        "id": "a101",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Abi Abambi",
                            "imgUrl": ""
                        },
                        "task": {
                            "id": "c101",
                            "title": "Replace Logo"
                        }
                    }
                ],
            }
        ]
        utilService.saveToStorage(KEY, boards)
    }
    return boards
}
