import { useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import Stage from './components/stage/Stage'
import './BoardView.scss'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { IStageMapObject } from '../data/boardContext'
import TaskModal, { ITaskModalMode, ITaskModalProps } from './components/taskModal/TaskModal'
import SearchBar from './components/searchBar/SearchBar';

/**
 * TYPES
 */
export interface IBoardViewProps {
  boardId: string,
  title: string,
  stageMap: IStageMapObject,
  moveTask: (result: DropResult) => void,
  updateTask: (task: ITask | Omit<ITask, 'taskId'>, mode: ITaskModalMode, stageId: string) => void,
  updateSearch:(text:string)=>void,
  deleteTask:(taskId:string,stageId:string)=>void
}

/**
 * COMPONENT
 */
function BoardView(props: IBoardViewProps) {
  const [taskModal, setTaskModal] = useState<ITaskModalProps | null>(null);

  const stageRef = useRef(null);

  const closeModal = () => {
    setTaskModal(null);
  }

  const updateAndClear = (...rest: [task: ITask | Omit<ITask, 'taskId'>, mode: ITaskModalMode, stageId: string]): void => {
    props.updateTask(...rest);
    setTaskModal(null);
  }

  const deleteAndClear = (...rest:[taskId:string,stageId:string]):void=>{
    props.deleteTask(...rest);
    setTaskModal(null);
  }

  const modalHandler = (stage: IStage, mode: ITaskModalMode, task?: ITask) => {
    if (mode === 'CREATE') {
      setTaskModal({
        mode,
        stage,
        updateTask: updateAndClear,
        closeModal
      })
    }
    else {
      setTaskModal({
        mode,
        stage,
        task,
        updateTask: updateAndClear,
        closeModal,
        deleteTask:deleteAndClear
      })
    }
  }
  
  const hideAddBtns = (hide:boolean)=>{
    const addBtns = document.querySelectorAll(".blend-btn");
    if(hide)
      addBtns.forEach(item=>item.classList.add("hide"));
    else
      addBtns.forEach(item=>item.classList.remove("hide"));
  }

  hideAddBtns(false);

  return (
    <DragDropContext onDragEnd={props.moveTask} onDragStart={()=>hideAddBtns(true)}>
      <div className='board'>
        <header>
          <h2>{props.title}</h2>
          <SearchBar searchFor={props.updateSearch} />
        </header>
        <div className="board-container" ref={stageRef}>
          {
            Object.keys(props.stageMap).map((stageId: string) => {
              const stage: IStageResponseObject = props.stageMap[stageId]
              return (
                <Stage key={stage.stageId} taskList={stage.taskList} stage={stage} moveTask={props.moveTask} updateTask={modalHandler} />
              )
            })
          }
        </div>
      </div>
      {
        taskModal ?
          createPortal(<TaskModal {...taskModal} />, document.getElementById('modal')) : null
      }

    </DragDropContext>
  )
}

export default BoardView