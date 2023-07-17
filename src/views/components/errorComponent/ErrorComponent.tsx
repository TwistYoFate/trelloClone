import './ErrorComponent.scss'

export interface IErrorComponentProps{
    message?:string
}

function ErrorComponent(props:IErrorComponentProps) {
  return (
    <div className="error-component">
        <span>
        {props.message || "Something went wrong"}
        </span>
    </div>
  )
}

export default ErrorComponent