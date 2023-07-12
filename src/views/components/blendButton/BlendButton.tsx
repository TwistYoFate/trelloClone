import { MouseEventHandler } from 'react'
import './BlendButton.scss'
import { MdAdd } from 'react-icons/md'
/**
 * TYPES
 */
export interface IBlendButtonProps {
    clickHandler?: MouseEventHandler<HTMLDivElement>
}


/**
 * COMPONENT
 */
function BlendButton({ clickHandler }: IBlendButtonProps) {
    const defaultHandler = () => {
        window.alert("No click handler attached")
    }
    return (
        <div className='blend-btn' onClick={clickHandler ? clickHandler : defaultHandler}>
            <MdAdd /> &nbsp; <p>Add a card</p>
        </div>
    )
}

export default BlendButton