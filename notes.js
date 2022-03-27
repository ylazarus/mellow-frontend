{
    "_id": "b101",
    "title": "Frontend Build",
    "isFavorite": false,
    "createdAt": 1648368189547,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": ""
    },
    "style": {
        "bgImg": "src/assets/imgs/1.jpg"
    },
    "labels": [
        {
            "id": "l101",
            "color": "#61bd4f",
            "title": "Done"
        },
        {
            "id": "l102",
            "color": "#f2d600",
            "title": "Urgent"
        },
        {
            "id": "l103",
            "color": "#ff9f1a",
            "title": "Immediate"
        },
        {
            "id": "l104",
            "color": "#eb5a46",
            "title": ""
        },
        {
            "id": "l105",
            "color": "#c377e0",
            "title": ""
        },
        {
            "id": "l106",
            "color": "#0079bf",
            "title": ""
        },
        {
            "id": "l107",
            "color": "#00c2e0",
            "title": ""
        },
        {
            "id": "l108",
            "color": "#51e898",
            "title": ""
        },
        {
            "id": "l109",
            "color": "#ff78cb",
            "title": ""
        },
        {
            "id": "l110",
            "color": "#344563",
            "title": ""
        },
        {
            "id": "l111",
            "color": "#b3bac5",
            "title": ""
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
            "title": "Immediate Todos",
            "tasks": [
                {
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "t-nMLMX279",
                    "title": "Remove exess pixels between group-list and scroll bar",
                    "createdAt": 1648369020184,
                    "style": {},
                    "attachments": [],
                    "labelIds": [
                        "l102",
                        "l103",
                        "l104"
                    ],
                    "dueDate": {
                        "dueDate": "2022-03-26T08:20:13.473Z",
                        "isCompleted": false
                    }
                },
                {
                    "id": "t-TI4ANfXQ",
                    "title": "Render the photos to task preview",
                    "createdAt": 1648369100551,
                    "style": {},
                    "attachments": []
                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Components to Build",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Archive instead of Delete"
                },
                {
                    "id": "c104",
                    "title": "Proper layout and full CRUD of images",
                    "checklists": [
                        {
                            "id": "YEtgF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "325jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "labelIds": [
                        "l105"
                    ],
                    "description": "Toggle should change image on task preview"
                },
                {
                    "id": "c105",
                    "title": "Render and add comments",
                    "status": "in-progress",
                    "description": "This will need a full update when the sockets are added but for now work on basic adding and rendering",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmFk111",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX111",
                                    "title": "To Do 1",
                                    "isDone": true
                                }
                            ]
                        },
                        {
                            "id": "YEhmF222",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX222",
                                    "title": "To Do 2",
                                    "isDone": false
                                },
                                {
                                    "id": "212jX333",
                                    "title": "To Do 3 is done",
                                    "isDone": true
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
                    "labelIds": [
                        "l107",
                        "l108"
                    ],
                    "createdAt": 1590999730348,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "style": {
                        "bgColor": "#26de81"
                    },
                    "dueDate": {
                        "dueDate": "2022-03-29T21:40:27.228Z",
                        "isCompleted": false
                    },
                    "attachments": [
                        "http://res.cloudinary.com/cajan22a/image/upload/v1648363384/Headshot_Yoni_2021_gkcpbo.jpg"
                    ]
                },
                {
                    "id": "t-PiYcSy3j",
                    "title": "Cover photo, make sure the first added is the default, subsequent ones can be changed manually to be the cover photos",
                    "createdAt": 1648369148256,
                    "style": {},
                    "attachments": [],
                    "description": "Trello has this as its default, looks really nice",
                    "dueDate": {
                        "dueDate": "2022-03-27T09:30:00.000Z",
                        "isCompleted": false
                    }
                },
                {
                    "id": "t-KkqBkx4T",
                    "title": "Checklists, super important to be next on our list, it adds a lot of value",
                    "createdAt": 1648369395722,
                    "style": {},
                    "attachments": []
                },
                {
                    "id": "t-VCawXr0K",
                    "title": "Render the data we have been collecting from the activities, the button to show and hide has been prepared",
                    "createdAt": 1648369658477,
                    "style": {},
                    "attachments": [],
                    "labelIds": [
                        "l105"
                    ],
                    "dueDate": {
                        "dueDate": "2022-03-28T08:25:53.455Z",
                        "isCompleted": false
                    }
                }
            ],
            "style": {}
        },
        {
            "id": "g-05mqUAOd",
            "title": "Feedback from Avior",
            "tasks": [
                {
                    "id": "t-J6zOG2sn",
                    "title": "Take a few pi",
                    "createdAt": 1648368936226,
                    "style": {},
                    "attachments": [],
                    "description": "",
                    "dueDate": {
                        "dueDate": "2022-03-30T15:25:00.000Z",
                        "isCompleted": false
                    }
                },
                {
                    "id": "t-FlDqD6BG",
                    "title": "Make sure to relax before the meeting with Asaf, and do a good job",
                    "createdAt": 1648369464026,
                    "style": {},
                    "attachments": [],
                    "labelIds": [
                        "l105",
                        "l106"
                    ],
                    "description": "The meeting will be short, give a quick run through of the flow, get good feedback"
                }
            ],
            "style": {}
        },
        {
            "id": "g-Wen1SpyZ",
            "title": "Done",
            "tasks": [
                {
                    "id": "t-yNkTEECH",
                    "title": "Reduce number of default labels on the boards to maximim of 6",
                    "createdAt": 1648369068557,
                    "style": {},
                    "attachments": [],
                    "labelIds": [
                        "l101"
                    ],
                    "dueDate": {
                        "dueDate": "2022-03-26T16:20:00.000Z",
                        "isCompleted": true
                    }
                },
                {
                    "id": "t-7JKrUUZr",
                    "title": "Clean up demo data",
                    "createdAt": 1648369083537,
                    "style": {},
                    "attachments": []
                }
            ],
            "style": {}
        },
        {
            "id": "g-va8kuIE2",
            "title": "For later this week",
            "tasks": [
                {
                    "id": "t-0HhNSPhU",
                    "title": "Look at Quello for extra add-on ideas",
                    "createdAt": 1648369345282,
                    "style": {},
                    "attachments": [],
                    "labelIds": [
                        "l105"
                    ]
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
        },
        {
            "id": "rgQTUE70",
            "txt": "save group title",
            "createdAt": 1648368203097,
            "group": {
                "id": "g101",
                "title": "Group 1"
            }
        },
        {
            "id": "tl2mQu8G",
            "txt": "save group title",
            "createdAt": 1648368204208,
            "group": {
                "id": "g101",
                "title": "Group 1"
            }
        },
        {
            "id": "NnJYheAO",
            "txt": "save group title",
            "createdAt": 1648368238800,
            "group": {
                "id": "g101",
                "title": "Immediate Todos"
            }
        },
        {
            "id": "1eThwGFa",
            "txt": "save group title",
            "createdAt": 1648368247802,
            "group": {
                "id": "g102",
                "title": "Group 2"
            }
        },
        {
            "id": "TwyX7WVn",
            "txt": "save group title",
            "createdAt": 1648368257335,
            "group": {
                "id": "g102",
                "title": "Group 2"
            }
        },
        {
            "id": "P9N2ZAx5",
            "txt": "save group title",
            "createdAt": 1648368266639,
            "group": {
                "id": "g102",
                "title": "Components to Build"
            }
        },
        {
            "id": "ZJfHOeCx",
            "txt": "save group title",
            "createdAt": 1648368294433,
            "group": {
                "id": "g-05mqUAOd",
                "title": "Backend"
            }
        },
        {
            "id": "a5o3Iidt",
            "txt": "save group title",
            "createdAt": 1648368301129,
            "group": {
                "id": "g-Wen1SpyZ",
                "title": "Done"
            }
        },
        {
            "id": "yTPbecRE",
            "txt": "save group title",
            "createdAt": 1648368321763,
            "group": {
                "id": "g-05mqUAOd",
                "title": "Backend"
            }
        },
        {
            "id": "GZ8MoaPj",
            "txt": "save group title",
            "createdAt": 1648368341989,
            "group": {
                "id": "g-05mqUAOd",
                "title": ""
            }
        },
        {
            "id": "w4QDHcjt",
            "txt": "save group title",
            "createdAt": 1648368362600,
            "group": {
                "id": "g-05mqUAOd",
                "title": ""
            }
        },
        {
            "id": "uDaQqQy5",
            "txt": "save group title",
            "createdAt": 1648368473189,
            "group": {
                "id": "g-05mqUAOd",
                "title": ""
            }
        },
        {
            "id": "6YEYWYEX",
            "txt": "save group title",
            "createdAt": 1648368484876,
            "group": {
                "id": "g-05mqUAOd",
                "title": "Feedback from Avior"
            }
        },
        {
            "id": "87inrkd0",
            "txt": "save group title",
            "createdAt": 1648368866764,
            "group": {
                "id": "g101",
                "title": "Immediate Todos"
            }
        },
        {
            "id": "uEUUMiyC",
            "txt": "add task",
            "createdAt": 1648368936226,
            "group": {
                "id": "g-05mqUAOd",
                "title": "Feedback from Avior"
            }
        },
        {
            "id": "5IHDG42X",
            "txt": "save group title",
            "createdAt": 1648368936285,
            "group": {
                "id": "g-Wen1SpyZ",
                "title": "Done"
            }
        },
        {
            "id": "7vJxYdQt",
            "txt": "add task",
            "createdAt": 1648369020184,
            "group": {
                "id": "g-05mqUAOd",
                "title": "Feedback from Avior"
            }
        },
        {
            "id": "3D5DAGK1",
            "txt": "add task",
            "createdAt": 1648369068558,
            "group": {
                "id": "g-Wen1SpyZ",
                "title": "Done"
            }
        },
        {
            "id": "GdJKjLTI",
            "txt": "add task",
            "createdAt": 1648369083538,
            "group": {
                "id": "g-Wen1SpyZ",
                "title": "Done"
            }
        },
        {
            "id": "AK6NkjMO",
            "txt": "add task",
            "createdAt": 1648369100552,
            "group": {
                "id": "g101",
                "title": "Immediate Todos"
            }
        },
        {
            "id": "LvhBJbun",
            "txt": "add task",
            "createdAt": 1648369148256,
            "group": {
                "id": "g102",
                "title": "Components to Build"
            }
        },
        {
            "id": "ApT83fwp",
            "txt": "Updated Description",
            "groupId": "g102",
            "createdAt": 1648369196991,
            "task": {
                "id": "t-PiYcSy3j",
                "title": "Cover photo, make sure the first added is the default, subsequent ones can be changed manually to be the cover photos"
            }
        },
        {
            "id": "8inzUrXY",
            "txt": "Updated due date",
            "groupId": "g102",
            "createdAt": 1648369215650,
            "task": {
                "id": "t-PiYcSy3j",
                "title": "Cover photo, make sure the first added is the default, subsequent ones can be changed manually to be the cover photos"
            }
        },
        {
            "id": "1j6i4sgw",
            "txt": "Change Labels",
            "groupId": "g-Wen1SpyZ",
            "createdAt": 1648369233890,
            "task": {
                "id": "t-yNkTEECH",
                "title": "Reduce number of default labels on the boards to maximim of 6"
            }
        },
        {
            "id": "XMAfpcgo",
            "txt": "Updated due date",
            "groupId": "g-Wen1SpyZ",
            "createdAt": 1648369247655,
            "task": {
                "id": "t-yNkTEECH",
                "title": "Reduce number of default labels on the boards to maximim of 6"
            }
        },
        {
            "id": "YoopJ1OF",
            "txt": "updated due date status",
            "groupId": "g-Wen1SpyZ",
            "createdAt": 1648369250689,
            "task": {
                "id": "t-yNkTEECH",
                "title": "Reduce number of default labels on the boards to maximim of 6"
            }
        },
        {
            "id": "UVjL7gYu",
            "txt": "Change Labels",
            "groupId": "g-05mqUAOd",
            "createdAt": 1648369267807,
            "task": {
                "id": "t-nMLMX279",
                "title": "Remove exess pixels between group-list and scroll bar"
            }
        },
        {
            "id": "ezQ6TWn9",
            "txt": "Change Labels",
            "groupId": "g-05mqUAOd",
            "createdAt": 1648369269161,
            "task": {
                "id": "t-nMLMX279",
                "title": "Remove exess pixels between group-list and scroll bar"
            }
        },
        {
            "id": "W0pkvrro",
            "txt": "Updated due date",
            "groupId": "g-05mqUAOd",
            "createdAt": 1648369278955,
            "task": {
                "id": "t-nMLMX279",
                "title": "Remove exess pixels between group-list and scroll bar"
            }
        },
        {
            "id": "b5U2QiON",
            "txt": "Change Labels",
            "groupId": "g-05mqUAOd",
            "createdAt": 1648369290122,
            "task": {
                "id": "t-nMLMX279",
                "title": "Remove exess pixels between group-list and scroll bar"
            }
        },
        {
            "id": "7It3Jw4j",
            "txt": "save group title",
            "createdAt": 1648369329171,
            "group": {
                "id": "g-va8kuIE2",
                "title": "For later this week"
            }
        },
        {
            "id": "3netnQsO",
            "txt": "add task",
            "createdAt": 1648369345283,
            "group": {
                "id": "g-va8kuIE2",
                "title": "For later this week"
            }
        },
        {
            "id": "5ec3PT7P",
            "txt": "Change Labels",
            "groupId": "g-va8kuIE2",
            "createdAt": 1648369350698,
            "task": {
                "id": "t-0HhNSPhU",
                "title": "Look at Quello for extra add-on ideas"
            }
        },
        {
            "id": "Txn8Q0s6",
            "txt": "add task",
            "createdAt": 1648369395723,
            "group": {
                "id": "g102",
                "title": "Components to Build"
            }
        },
        {
            "id": "jZj19qyo",
            "txt": "add task",
            "createdAt": 1648369464026,
            "group": {
                "id": "g-05mqUAOd",
                "title": "Feedback from Avior"
            }
        },
        {
            "id": "CQttIpht",
            "txt": "Change Labels",
            "groupId": "g-05mqUAOd",
            "createdAt": 1648369471149,
            "task": {
                "id": "t-FlDqD6BG",
                "title": "Make sure to relax before the meeting with Asaf, and do a good job"
            }
        },
        {
            "id": "wTFoRgEN",
            "txt": "Change Labels",
            "groupId": "g-05mqUAOd",
            "createdAt": 1648369472114,
            "task": {
                "id": "t-FlDqD6BG",
                "title": "Make sure to relax before the meeting with Asaf, and do a good job"
            }
        },
        {
            "id": "YuMVHdES",
            "txt": "Change Labels",
            "groupId": "g-05mqUAOd",
            "createdAt": 1648369474619,
            "task": {
                "id": "t-FlDqD6BG",
                "title": "Make sure to relax before the meeting with Asaf, and do a good job"
            }
        },
        {
            "id": "sCe6KWcd",
            "txt": "Change Labels",
            "groupId": "g-05mqUAOd",
            "createdAt": 1648369477254,
            "task": {
                "id": "t-FlDqD6BG",
                "title": "Make sure to relax before the meeting with Asaf, and do a good job"
            }
        },
        {
            "id": "pa94Rc8n",
            "txt": "Updated Description",
            "groupId": "g-05mqUAOd",
            "createdAt": 1648369511025,
            "task": {
                "id": "t-FlDqD6BG",
                "title": "Make sure to relax before the meeting with Asaf, and do a good job"
            }
        },
        {
            "id": "fk7jMogv",
            "txt": "Updated due date",
            "groupId": "g-05mqUAOd",
            "createdAt": 1648369564076,
            "task": {
                "id": "t-J6zOG2sn",
                "title": "Take a few pi"
            }
        },
        {
            "id": "GkbtB5Wj",
            "txt": "save group title",
            "createdAt": 1648369582777,
            "group": {
                "id": "g102",
                "title": "Components to Build"
            }
        },
        {
            "id": "mUJFLJqX",
            "txt": "add task",
            "createdAt": 1648369658477,
            "group": {
                "id": "g102",
                "title": "Components to Build"
            }
        },
        {
            "id": "PcqvtoZs",
            "txt": "Change Labels",
            "groupId": "g102",
            "createdAt": 1648369663901,
            "task": {
                "id": "t-VCawXr0K",
                "title": "Render the data we have been collecting from the activities, the button to show and hide has been prepared"
            }
        },
        {
            "id": "2jM4ahQR",
            "txt": "Change Labels",
            "groupId": "g102",
            "createdAt": 1648369665708,
            "task": {
                "id": "t-VCawXr0K",
                "title": "Render the data we have been collecting from the activities, the button to show and hide has been prepared"
            }
        },
        {
            "id": "j6q98tUs",
            "txt": "Change Labels",
            "groupId": "g102",
            "createdAt": 1648369667429,
            "task": {
                "id": "t-VCawXr0K",
                "title": "Render the data we have been collecting from the activities, the button to show and hide has been prepared"
            }
        },
        {
            "id": "ISNmFvAR",
            "txt": "Updated due date",
            "groupId": "g102",
            "createdAt": 1648369677032,
            "task": {
                "id": "t-VCawXr0K",
                "title": "Render the data we have been collecting from the activities, the button to show and hide has been prepared"
            }
        },
        {
            "id": "a60GcWLC",
            "txt": "save group title",
            "createdAt": 1648369801257,
            "group": {
                "id": "g102",
                "title": "Components to Build"
            }
        },
        {
            "id": "aeWY4nye",
            "txt": "Change Labels",
            "groupId": "g102",
            "createdAt": 1648369821021,
            "task": {
                "id": "c104",
                "title": "Do that"
            }
        },
        {
            "id": "pbYblrs5",
            "txt": "Updated Description",
            "groupId": "g102",
            "createdAt": 1648369839129,
            "task": {
                "id": "c104",
                "title": "Do that"
            }
        }
    ]
}


// Guidelines
// boardStore (no need for groupStore, taskStore), boardService  **Yoni: also userstore?
// *. Support saving the entire board and also on the task level, **Yoni: why do we need to save the whole board at once? start with saving the whole board and then later the task level
// PUT /api/board/b123/task/t678
//    (no need for seperate APIs for mini-updates of task parts like members or status) **resave entire task?
// *. No need for saving an activities array per task, those activities are easily filtered from the board activities  **make a list of all activities, can filter afterwards
// *. activites - when board is updated, the frontend does not send the activities array within the board 
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios
// *. D & D Guidelines - vue-smooth-dnd / vuedraggable / react-beutiful-dnd  **vue draggable for vue 3**
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. We do not handle concurrent editing - needs versioning  ** meaning we don't need to worry about two users editing simultaneously?

// Rendering performance:  
// Store Mutation - saveBoard
// state.board = board
// Later, support switching a specific task

// ** please expand on the flow here 
// <BoardDetails> => <BoardGroup v-for>
// <BoardGroup> => <TaskPreview v-for>
// <TaskDetails> (+edit) - initially can be loaded in seperate route (later on we can place it in a modal and nested route)

// ** do any of these need to be dynamic components? or only in the Monday app?

{/* <task-detail>
    <membersCMP  />
    <labelsCMP />
</task-detail> */}

{/* <task-detail>
    <compoenent v-for="cmp in cmps" :is="cmp">
</task-detail>
cmps = ['members', 'labels'] */}

// Store - saveTask  ** why do i need to save the entire board instead of updating a task?
function storeSaveTask(task, activity) {
    const activity = {
        "id": makeId(),
        "txt": "Changed Color",
        "createdAt": Date.now(),
        "byMember": userService.getLoggedinUser(),
        "task": task  // take out details and extract only mini task?
    }
    board = boardService.saveTask(boardId, groupId, task, activity)
    commit(board)
}

// boardService
function saveTask(boardId, groupId, task, activity) {
    const board = getById(boardId)
    // TODO: find the task, and update
    board.activities.unshift(activity)
    saveBoard(board)
    return board
}

// boardStore-action
async function loadAndWatchBoard(boardId) {
    // load from service and commit to store
    // subscribe to socket and commit to store
}



const board = {
    "_id": "b101",
    "title": "Robot dev proj",
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
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
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://www.google.com"
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
                    "title": "Do that"
                },
                {
                    "id": "c104",
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
                                },
                                {
                                    "id": "333jX",
                                    "title": "To Do 2",
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
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ],
    // for monday
    "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
}
const user = {
    "_id": "u101",
    "fullname": "Abi Abambi",
    "username": "abi@ababmi.com",
    "password": "aBambi123",
    "imgUrl": "http://some-img.jpg",
    "mentions": [{  //where will we use this? profile?
        "id": "m101",
        "boardId": "m101",
        "taskId": "t101"
    }]
}

// For Monday Mostly:
// Dynamic Components: 
// <TaskPreview> => <tr> 
//    <td v-for="(cmpType) in cmpsOrder">
//         <component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)">
//    </td>

function updateTask(cmpType, data) {
    // Switch
    // task.members = data;
    // task.status = data;
}


const cmp1 = {
    type: 'status-picker',
    info: {
        selectedStatus: 'pending',
        statuses: [{}, {}]
    }
}

const cmp2 = {
    type: 'member-picker',
    info: {
        selectedMembers: ['m1', 'm2'],
        members: ['m1', 'm2', 'm3']
    }
}

const cmp3 = {
    type: 'date-picker',
    info: {
        selectedDate: '2022-09-07',
    }
}


// export function TaskPreview({ task }) {
//     //GET FROM STORE
//     const cmpsOrder = [
//       "status-picker",
//       "member-picker",
//       "date-picker",
//       "priority-picker",
//     ];
//     return (
//       <section>
//         <h5>{task.txt}</h5>
//         {cmpsOrder.map((cmp, idx) => {
//           return (
//             <DynamicCmp
//               cmp={cmp}
//               key={idx}
//               onUpdate={(data) => {
//                 console.log("Updating: ", cmp, "with data:", data);
//                 // make a copy, update the task
//                 // Call action: updateTask(task)
//               }}
//             />
//           );
//         })}
//       </section>
//     );
//   }

// export function DynamicCmp({ cmp, info, onUpdate }) {
//     switch (cmp) {
//         case "status-picker":
//             return <StatusCmp info={info} onUpdate={onUpdate} />;
//         case "member-picker":
//             return <MemberPicker info={info} onUpdate={onUpdate} />;
//         default:
//             return <p>UNKNOWN {cmp}</p>;
//     }
// }
