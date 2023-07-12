export type ITask = {
    taskId:string,
    title:string,
    stageId:string,
    description:string
}

export type IStage = {
    stageId:string,
    title:string,
    boardId:string,
    index:number
}

export type IBoard = {
    boardId:string,
    title:string,
    stageList:IStage[] | null | []
    taskList:ITask[] | null | []
}

export interface IStageResponseObject extends IStage{
    taskList:ITask[]
}