import React, { ReactElement, useRef } from 'react'
import './TextWithIcon.scss'
/**
 * TYPES
 */
export interface ITextWithIconProps{
    text:string;
    updateText?:Function;
    Icon?:()=>ReactElement;
    mode:'txt-h-icon'|'txt-p-icon'|'txt-h'|'txt-p';
    placeholder?:string;
    editable?:boolean;
}

/**
 * COMPONENT
 */
function TextWithIcon(props:ITextWithIconProps) {
    const [focus,setFocus] = React.useState(false);
    const divref = useRef(null);
    React.useEffect(()=>{
        if(!focus && props?.editable){
            props.updateText(divref.current.innerText)
        }
    },[focus])

  return (
    <div className={props.mode||'txt-h'}>
        {props.Icon?<props.Icon />:<div></div>}
        <p ref={divref} contentEditable={props?.editable||false} onFocus={()=>{setFocus(true)}} onBlur={()=>{setFocus(false)}}>
            {props.text||props?.placeholder||'Enter text'}
        </p>
    </div>
  )
}

export default TextWithIcon