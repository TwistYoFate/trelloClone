import { IStage, ITask } from '../../../domain'
import './TaskCard.scss'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { ITaskModalMode } from '../taskModal/TaskModal';

/**
 * TYPES
 */
export interface ITaskCardProps {
  stage: IStage;
  task: ITask;
  index: number;
  updateTask: (stage: IStage, mode: ITaskModalMode, task: ITask) => void;
}

/**
 * COMPONENT
 */
function TaskCard(props: ITaskCardProps) {
  return (
    <Draggable draggableId={props.task.taskId} index={props.index}>
      {
        (provided: DraggableProvided) => (
          <div className='task-card' 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
          ref={provided.innerRef} 
          onClick={
            () => 
            { props.updateTask(props.stage, 'EDIT', props.task) }
          }>
            <div>
              <p>{props.task.title}</p>
            </div>
          </div>
        )
      }
    </Draggable>
  )
}

export default TaskCard