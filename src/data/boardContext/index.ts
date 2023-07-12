import { IStageResponseObject } from "../../domain";
import { createTask, deleteTask, moveTaskAcrossStages, moveTaskWithinStage, updateTask } from "./actionHandlers";


/**
 * TYPES
 */
export interface IStageMapObject{
    [key:string]:IStageResponseObject
}

export interface IBoardContext{
    boardId:string,
    title:string,
    stageMap:IStageMapObject
}

/**
 * INITIAL STATE OF BOARD STORE
 */

const initialBoard: IBoardContext = {
    boardId: "",
    title: "",
    stageMap: {}
}

/**
 * REDUCER OF BOARD STORE
 */
const reducer = (state: IBoardContext, action: IAction): IBoardContext => {

    switch (action.type) {

        case ACTIONS.LOAD_BOARD:
            let stageMap = {};
            action.payload.stageList.map(stage=>{
                stageMap[stage.stageId] = stage;
            })
            return {
                ...action.payload,
                stageMap
            }
        case ACTIONS.LOAD_CACHED_BOARD:
            return {...action.payload}
        case ACTIONS.CREATE_TASK:
            return createTask(state,action.payload.task);
        case ACTIONS.UPDATE_TASK:
            return updateTask(state,action.payload.task);
        case ACTIONS.DELETE_TASK:
            return deleteTask(state,action.payload.taskId,action.payload.stageId);
        case ACTIONS.MOVE_TASK_WITHIN_STAGE:
            return moveTaskWithinStage(state,action.payload.stageId,action.payload.fromIndex,action.payload.toIndex);
        case ACTIONS.MOVE_TASK_ACROSS_STAGES:
            const {sourceStageId,destinationStageId,fromIndex,toIndex} = action.payload;
            return moveTaskAcrossStages(state,sourceStageId,destinationStageId,fromIndex,toIndex);
        default:
            return state;
    }
}

/**
 * ACTIONS USED FOR BOARD STORE
 */

const ACTIONS = {
    CREATE_TASK: 'CREATE_TASK',
    LOAD_BOARD: 'LOAD_BOARD',
    LOAD_CACHED_BOARD: 'LOAD_CACHED_BOARD',
    MOVE_TASK_WITHIN_STAGE: 'MOVE_TASK_WITHIN_STAGE',
    MOVE_TASK_ACROSS_STAGES: 'MOVE_TASK_ACROSS_STAGES',
    UPDATE_TASK:'UPDATE_TASK',
    DELETE_TASK:'DELETE_TASK'
}

/**
 * RETURNABLE OBJECT FROM BOARD STORE
 */
const output = {
    state: initialBoard,
    reducer,
    ACTIONS
}

export default output