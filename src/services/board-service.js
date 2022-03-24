import { storageService } from "./async-storage-service.js"
import { utilService } from "./util-service.js"
import axios from "axios"
axios.defaults.withCredentials = true

// const BOARD_URL = '//localhost:3030/api/board/'
const BOARD_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/board/'
    : '//localhost:3030/api/board/';
const KEY = "boards_db"


export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    uploadImg
}

// _createBoards()

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

async function uploadImg(ev) {
    const UPLOAD_PRESET = 'cajan_22';
    const CLOUD_NAME = 'cajan22a';
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const FORM_DATA = new FormData();

    FORM_DATA.append('file', ev.target.files[0]);
    FORM_DATA.append('upload_preset', UPLOAD_PRESET);
    return fetch(UPLOAD_URL, {

        method: 'POST',
        body: FORM_DATA,
    })
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => console.error(err));
};

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
        style: {},
        attachments: []
    }

}

function getEmptyBoard(title) {

    const board = {
        title,
        isFavorite: false,
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
                "style": {
                    'bgImg': 'src/assets/imgs/1.jpg',
                },
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
                            {
                                "id": "c105",
                                "title": "Help me",
                                "status": "in-progress",
                                "description": "description",
                                "comments": [
                                    {
                                        "id": "ZdPnm",
                                        "txt": "also @yaronb please CR this",
                                        "createdAt": 1590999817436.0,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Tal Tarablus",
                                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                        }
                                    }
                                ],
                                "checklists": [
                                    {
                                        "id": "YEhmF",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "212jX",
                                                "title": "To Do 1",
                                                "isDone": false
                                            }
                                        ]
                                    }
                                ],
                                "members": [
                                    {
                                        "_id": "u101",
                                        "username": "Tal",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    }
                                ],
                                "labelIds": ["l101", "l102"],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                                "style": {
                                    "bgColor": "#26de81"
                                }
                            }

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
            },
            {
                "_id": utilService.makeId(),
                "title": "Second Project",
                "isFavorite": true,
                "createdAt": Date.now(),
                "createdBy": {
                    "_id": utilService.makeId(),
                    "fullname": "Jo Abramovich",
                    "imgUrl": ""
                },
                "style": {
                    'bgImg': 'src/assets/imgs/2.jpg',
                },
                "labels": [
                    {
                        "id": 'L321',
                        "title": "Done",
                        "color": "#61bd4f"
                    },
                    {
                        "id": 'L654',
                        "title": "Progress",
                        "color": "#61bd33"
                    },
                    {
                        "id": 'L681',
                        "title": "Progress",
                        "color": "#88888"
                    }

                ],
                "members": [
                    {
                        "_id": "u1012",
                        "fullname": "Tal Tarablus",
                        "imgUrl": ""
                    }
                ],
                "groups": [
                    {
                        "id": utilService.makeId(),
                        "title": "Group 1",
                        "tasks": [
                            {
                                "id": utilService.makeId(),
                                "title": "Replace logo"
                            },
                            {
                                "id": utilService.makeId(),
                                "title": "Add Samples"
                            }
                        ],
                        "style": {}
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Group 2",
                        "tasks": [
                            {
                                "id": utilService.makeId(),
                                "title": "Do this"
                            },
                            {
                                "id": utilService.makeId(),
                                "title": "Do that"
                            },
                            {
                                "id": utilService.makeId(),
                                "title": "Help me",
                                "status": "in-progress",
                                "description": "description",
                                "comments": [
                                    {
                                        "id": utilService.makeId(),
                                        "txt": "also @yaronb please CR this",
                                        "createdAt": 1590999817436.0,
                                        "byMember": {
                                            "_id": "u1012",
                                            "fullname": "Tal Tarablus",
                                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                        }
                                    }
                                ],
                                "checklists": [],
                                "members": [],
                                "labelIds": [],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u1012",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                                "style": {
                                    "bgColor": "#26de81"
                                }
                            }

                        ],
                        "style": {}
                    }
                ],
                "activities": [
                ],
            },
            {
                "_id": utilService.makeId(),
                "title": "Third Project",
                "isFavorite": true,
                "createdAt": Date.now(),
                "createdBy": {
                    "_id": utilService.makeId(),
                    "fullname": "Jo Abramovich",
                    "imgUrl": ""
                },
                "style": {
                    'bgImg': 'src/assets/imgs/3.jpg',
                },
                "labels": [
                    {
                        "id": 'L951',
                        "title": "Done",
                        "color": "#61bd4f"
                    },
                    {
                        "id": 'L753',
                        "title": "Progress",
                        "color": "#61bd33"
                    },
                    {
                        "id": 'L482',
                        "title": "Progress",
                        "color": "#88888"
                    }

                ],
                "members": [
                    {
                        "_id": "u1012",
                        "fullname": "Tal Tarablus",
                        "imgUrl": ""
                    }
                ],
                "groups": [
                    {
                        "id": utilService.makeId(),
                        "title": "Group 1",
                        "tasks": [
                            {
                                "id": utilService.makeId(),
                                "title": "Replace logo"
                            },
                            {
                                "id": utilService.makeId(),
                                "title": "Add Samples"
                            }
                        ],
                        "style": {}
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Group 2",
                        "tasks": [
                            {
                                "id": utilService.makeId(),
                                "title": "Do this"
                            },
                            {
                                "id": utilService.makeId(),
                                "title": "Do that"
                            },
                            {
                                "id": utilService.makeId(),
                                "title": "Help me",
                                "status": "in-progress",
                                "description": "description",
                                "comments": [
                                    {
                                        "id": utilService.makeId(),
                                        "txt": "also @yaronb please CR this",
                                        "createdAt": 1590999817436.0,
                                        "byMember": {
                                            "_id": "u1012",
                                            "fullname": "Tal Tarablus",
                                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                        }
                                    }
                                ],
                                "checklists": [],
                                "members": [],
                                "labelIds": [],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u1012",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                                "style": {
                                    "bgColor": "#26de81"
                                }
                            }

                        ],
                        "style": {}
                    }
                ],
                "activities": [
                ],
            },
            {
                "_id": utilService.makeId(),
                "title": "Fourth Project",
                "isFavorite": true,
                "createdAt": Date.now(),
                "createdBy": {
                    "_id": utilService.makeId(),
                    "fullname": "Jo Abramovich",
                    "imgUrl": ""
                },
                "style": {
                    'bgImg': 'src/assets/imgs/4.jpg',
                },
                "labels": [
                    {
                        "id": 'L951',
                        "title": "Done",
                        "color": "#61bd4f"
                    },
                    {
                        "id": 'L753',
                        "title": "Progress",
                        "color": "#61bd33"
                    },
                    {
                        "id": 'L482',
                        "title": "Progress",
                        "color": "#88888"
                    }

                ],
                "members": [
                    {
                        "_id": "u1012",
                        "fullname": "Tal Tarablus",
                        "imgUrl": ""
                    }
                ],
                "groups": [
                    {
                        "id": utilService.makeId(),
                        "title": "Group 1",
                        "tasks": [
                            {
                                "id": utilService.makeId(),
                                "title": "Replace logo"
                            },
                            {
                                "id": utilService.makeId(),
                                "title": "Add Samples"
                            }
                        ],
                        "style": {}
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Group 2",
                        "tasks": [
                            {
                                "id": utilService.makeId(),
                                "title": "Do this"
                            },
                            {
                                "id": utilService.makeId(),
                                "title": "Do that"
                            },
                            {
                                "id": utilService.makeId(),
                                "title": "Help me",
                                "status": "in-progress",
                                "description": "description",
                                "comments": [
                                    {
                                        "id": utilService.makeId(),
                                        "txt": "also @yaronb please CR this",
                                        "createdAt": 1590999817436.0,
                                        "byMember": {
                                            "_id": "u1012",
                                            "fullname": "Tal Tarablus",
                                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                        }
                                    }
                                ],
                                "checklists": [],
                                "members": [],
                                "labelIds": [],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u1012",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                                "style": {
                                    "bgColor": "#26de81"
                                }
                            }

                        ],
                        "style": {}
                    }
                ],
                "activities": [
                ],
            },

        ]
        utilService.saveToStorage(KEY, boards)
    }
    return boards
}
