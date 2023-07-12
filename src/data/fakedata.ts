import { IStageResponseObject } from "../domain";

export interface IBoardResponse{
    boardId:String,
    title:String,
    stageList:IStageResponseObject[]
}

const data: IBoardResponse = {
    boardId: "b1",
    title: "Kanban",
    stageList: [{
        stageId: "s1",
        title: "Backlog",
        boardId: "b1",
        index: 1,
        taskList:[{
            taskId: 't2',
            title: 'discuss availability',
            stageId: 's1',
            description: 'meeting'
        },
        {
            taskId: 't3',
            title: 'allocate tasks',
            stageId: 's1',
            description: 'tasks'
        },
        {
            taskId: 't4',
            title: 'allocate tasks 2',
            stageId: 's1',
            description: 'tasks 2'
        },
        {
            taskId: 't5',
            title: 'allocate tasks 3',
            stageId: 's1',
            description: 'tasks 3'
        }
    ]
    },
    {
        stageId: "s2",
        title: "Todo",
        boardId: "b1",
        index: 2,
        taskList:[ {
            taskId: 't1',
            title: 'create story',
            stageId: 's2',
            description: 'create story for next phase'
        }]
    },
    {
        stageId: "s3",
        title: "In Progress",
        boardId: "b1",
        index: 3,
        taskList:[ {
            taskId: 't6',
            title: 'bug',
            stageId: 's3',
            description: 'error in uat'
        }]
    },
    {
        stageId: "s4",
        title: "Done",
        boardId: "b1",
        index: 4,
        taskList:[ {
            taskId: 't7',
            title: 'feature 2',
            stageId: 's4',
            description: 'money transaction'
        }]
    }]
}

export default data;