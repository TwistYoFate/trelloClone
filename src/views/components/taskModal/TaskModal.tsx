import { useEffect, useState } from 'react'
import './TaskModal.scss';
import TextWithIcon from '../textWithIcon/TextWithIcon';
import { MdAnalytics, MdNotes, MdClear } from 'react-icons/md';

/**
 * TYPES
 */
export type ITaskModalMode = 'CREATE' | 'EDIT';

export interface ITaskModalProps {
    mode: ITaskModalMode,
    task?: ITask,
    stage: IStage;
    updateTask: (task:ITask|Omit<ITask,'taskId'>,mode:ITaskModalMode,stageId:string) => void
    closeModal:()=>void;
    deleteTask?:(taskId:string,stageId:string)=>void
}

/**
 * DEFAULT task object
 */
const initTask: Omit<ITask, 'taskId'> = {
    title: '',
    stageId: '',
    description: ''
}

/**
 * COMPONENT
 */
function TaskModal(props: ITaskModalProps) {
    const [task, setTask] = useState<ITask | Omit<ITask, 'taskId'>>(initTask)

    useEffect(() => {
        switch (props.mode) {
            case 'EDIT':
                setTask(props.task);
                return;
            default:
                return;
        }
    }, [])

    const updateTitle = (text: string) => {
        setTask({
            ...task,
            title: text
        })
    }

    const updateDesc = (text: string) => {
        setTask({
            ...task,
            description: text
        })
    }

    const submitHandler = ()=>{
        props.updateTask(task,props.mode,props.stage.stageId);
    }

    const deleteHandler = ()=>{
        if(props.deleteTask)
            props.deleteTask(props.task.taskId,props.stage.stageId);
    }

    return (
        <>
            <div className='overlay'></div>
            <div className='task-modal'>
                <section className="task-modal-left">
                    <TextWithIcon
                        text={task.title}
                        updateText={updateTitle}
                        mode={'txt-h-icon'}
                        Icon={MdAnalytics}
                        placeholder='Enter title'
                        editable={true}
                    />
                    <div className="ml-2">
                        in list {props.stage?.title || ''}
                    </div>
                    <div className='mt-2'></div>
                    <TextWithIcon
                        text="Description"
                        mode={'txt-p-icon'}
                        Icon={MdNotes}
                        placeholder='Enter description'
                        editable={false}
                    />
                    <textarea value={task.description} onChange={(e)=>updateDesc(e.target.value)} className='ml-2 mt-1' placeholder='Enter the description for your task here...'></textarea>
                </section>
                <section className="task-modal-right">
                    <MdClear onClick={props.closeModal}/>
                    <div className='btns'>
                    {props.mode==='EDIT'?<button className='del-btn' onClick={deleteHandler}>Delete</button>:null}
                    <button onClick={submitHandler}>Save</button>
                    </div>
                </section>

            </div>
        </>
    )
}

export default TaskModal