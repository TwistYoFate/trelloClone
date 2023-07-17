import { useEffect, useReducer, useState } from 'react'
import boardContext, { IBoardContext } from '../data/boardContext'
import fakeData from '../data/fakedata'
import { DropResult } from 'react-beautiful-dnd'
import { ITaskModalMode } from '../views/components/taskModal/TaskModal'
import uniqid from 'uniqid';
import { cacheBoardData, debounce } from '../utils'

/**
 * View Model for Board View
 */
function useBoardVM() {
  const [state,dispatch] = useReducer(boardContext.reducer,boardContext.state);
  const [searchText,setSearchText] = useState('');
  
  // Initial loading of the data in context if present
  useEffect(()=>{
    const cachedData = sessionStorage.getItem("boardData");
    if(cachedData){
      const data = JSON.parse(cachedData);
      if(!data.boardId.length){
        dispatch({
          type:boardContext.ACTIONS.LOAD_BOARD,
          payload:fakeData
        })
      }
      else{
        dispatch({
          type:boardContext.ACTIONS.LOAD_CACHED_BOARD,
          payload:data
        })
      }
    }
    else{
      dispatch({
        type:boardContext.ACTIONS.LOAD_BOARD,
        payload:fakeData
      })
    }
  },[])

  // Whenever state changes, do debounced caching in session
  useEffect(()=>{
    const debouncedCache = debounce(cacheBoardData,2000);
    debouncedCache(state);
  },[state])

  // Handles the moving of task from or within a stage
  const moveTask = (result:DropResult):void=>{
    if(result.reason==="CANCEL")return;
    if(!result.destination || !result.destination.droppableId) return;
    const {destination,source} = result;
    if((destination.droppableId === source.droppableId) && destination.index===source.index) return;
    const start = state.stageMap[source.droppableId];
    const end = state.stageMap[destination.droppableId];

    if(start===end){
        dispatch({
            type:boardContext.ACTIONS.MOVE_TASK_WITHIN_STAGE,
            payload:{
                stageId:source.droppableId,
                fromIndex:source.index,
                toIndex:destination.index
            }
        })
    }
    else{
        dispatch({
            type:boardContext.ACTIONS.MOVE_TASK_ACROSS_STAGES,
            payload:{
                sourceStageId:source.droppableId,
                destinationStageId:destination.droppableId,
                fromIndex:source.index,
                toIndex:destination.index
            }
        })
    }
  }

  // Creates or Updates a task
  const updateTask = (task:ITask|Omit<ITask,'taskId'>,mode:ITaskModalMode,stageId:string)=>{
    if(mode==='CREATE'){
        const newTask = {
            ...task,
            taskId:uniqid(),
            stageId:stageId,
        }
        dispatch({
            type:boardContext.ACTIONS.CREATE_TASK,
            payload:{
                task:newTask
            }
        })
    }
    else{
        dispatch({
            type:boardContext.ACTIONS.UPDATE_TASK,
            payload:{
                task
            }
        })
    }
  }

  // Deletes a task
  const deleteTask = (taskId:string,stageId:string)=>{
    dispatch({
      type:boardContext.ACTIONS.DELETE_TASK,
      payload:{
        taskId,
        stageId
      }
    })
  }

  // Filters the tasklists of all stages based on the titles matching the searchText 
  const filterState = ():IBoardContext=>{
        if(!searchText.length) return state;
        const filteredBoard = JSON.parse(JSON.stringify(state));
        for(let stageId in state.stageMap){
            filteredBoard.stageMap[stageId].taskList = state.stageMap[stageId].taskList.filter(task=>{
                return(
                    task.title.indexOf(searchText)!==-1
                )
            })
        }
        return filteredBoard;
  }

  // Updates the searchText
  const updateSearch = (text:string)=>{
    setSearchText(text);
  }

  return {
    state:filterState(),
    moveTask,
    updateTask,
    updateSearch,
    deleteTask
  }
}

export default useBoardVM