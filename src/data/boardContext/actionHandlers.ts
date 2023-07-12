import { IBoardContext } from ".";
import { ITask } from "../../domain";

// This is used to initially fetch and load data
export function loadData(action: IAction): IBoardContext {
    let stageMap = {};
    action.payload.stageList.map(stage => {
        stageMap[stage.stageId] = stage;
    })
    return {
        ...action.payload,
        stageMap
    }
}


/**
 * If a task is dragged and dropped within it's original stage, this action handler will be triggered
 */
export function moveTaskWithinStage(store: IBoardContext, stageId: string, fromIndex: number, toIndex: number): IBoardContext {
    if (fromIndex === toIndex) return store;
    const newTasklist = Array.from(store.stageMap[stageId].taskList);
    const task = newTasklist[fromIndex];
    newTasklist.splice(fromIndex, 1);
    newTasklist.splice(toIndex, 0, task);
    return {
        ...store,
        stageMap: {
            ...store.stageMap,
            [stageId]: {
                ...store.stageMap[stageId],
                taskList: newTasklist
            }
        }
    }
}

/**
 * If a task is dragged and dropped from one stage to another, this action handler will be triggered
 */
export function moveTaskAcrossStages(store: IBoardContext, sourceStageId: string, destinationStageId: string, fromIndex: number, toIndex: number): IBoardContext {
    const newSourceTasklist = Array.from(store.stageMap[sourceStageId].taskList);
    const newDestinationTasklist = Array.from(store.stageMap[destinationStageId].taskList);

    const task = newSourceTasklist[fromIndex];
    task.stageId = destinationStageId;
    newSourceTasklist.splice(fromIndex, 1);
    newDestinationTasklist.splice(toIndex, 0, task)

    return {
        ...store,
        stageMap: {
            ...store.stageMap,
            [sourceStageId]: {
                ...store.stageMap[sourceStageId],
                taskList: newSourceTasklist
            },
            [destinationStageId]: {
                ...store.stageMap[destinationStageId],
                taskList: newDestinationTasklist
            }
        }
    }
}

/**
 * If a new task is to be created, this action handler will be triggered
 */
export function createTask(store: IBoardContext, task: ITask): IBoardContext {
    const { stageId } = task;
    const newStore = {
        ...store,
        stageMap: {
            ...store.stageMap,
            [stageId]: {
                ...store.stageMap[stageId],
                taskList: [...store.stageMap[stageId].taskList, task]
            }
        }
    }
    return newStore;
}

/**
 * If a task is to be updated, this action handler will be triggered
 */
export function updateTask(store: IBoardContext, task: ITask): IBoardContext {
    const { stageId } = task;
    const newStore = {
        ...store,
        stageMap: {
            ...store.stageMap,
            [stageId]: {
                ...store.stageMap[stageId],
                taskList: store.stageMap[stageId].taskList.map((currTask: ITask) => {
                    if (currTask.taskId === task.taskId) {
                        return task;
                    }
                    return currTask;
                })
            }
        }
    }
    return newStore;
}

/**
 * If a task is to be deleted, this action handler will be triggered
 */
export function deleteTask(store: IBoardContext, taskId: string, stageId: string): IBoardContext {
    const newStore = {
        ...store,
        stageMap: {
            ...store.stageMap,
            [stageId]: {
                ...store.stageMap[stageId],
                taskList: store.stageMap[stageId].taskList.filter(currTask => currTask.taskId !== taskId)
            }
        }
    }
    return newStore;
}


export default {
    moveTaskWithinStage,
    createTask
}