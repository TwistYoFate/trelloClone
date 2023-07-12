import { IStage, ITask } from '../../../domain'
import './Stage.scss'
import TaskCard from '../taskCard/TaskCard'
import { Droppable, DroppableProvided } from 'react-beautiful-dnd'
import {MdOutlineMoreHoriz} from 'react-icons/md';
import BlendButton from '../blendButton/BlendButton'
import { ITaskModalMode } from '../taskModal/TaskModal'

/**
 * TYPES
 */
export interface IStageProps {
    stage: IStage,
    taskList: ITask[] | null | [],
    moveTask: Function,
    updateTask:(stage:IStage,mode:ITaskModalMode,task?:ITask)=>void,
}


/**
 * COMPONENT
 */
function Stage(props: IStageProps) {

    const addNewTask =()=>{

        props.updateTask(props.stage,'CREATE');

    }
    return (
        <Droppable droppableId={props.stage.stageId}>
            {
                (provided: DroppableProvided) => (
                    <div className='stage' {...provided.droppableProps} ref={provided.innerRef}>
                        <header>
                            <h3>
                                {props.stage.title}
                            </h3>
                            <MdOutlineMoreHoriz class="three-dots" />
                        </header>
                        <div className="container" id={props.stage.stageId} >
                            {
                                props.taskList.map((task: ITask, index: number) => {
                                    return (
                                        <TaskCard key={task.taskId} task={task} stage={props.stage} index={index} updateTask={props.updateTask}/>
                                    )
                                })
                            }
                        </div>
                        <BlendButton clickHandler={addNewTask} />
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    )
}

export default Stage