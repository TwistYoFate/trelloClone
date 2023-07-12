import React from 'react'
import { debounce } from '../../../utils'
import './SearchBar.scss';

/**
 * TYPES
 */
export interface ISearchBarProps{
    searchFor:(text:string)=>void,
    delay?:number
}

/**
 * COMPONENT
 */
function SearchBar(props:ISearchBarProps) {
 
  const searchForDebounced = debounce(props.searchFor,props.delay?props.delay:1000)
  
  return (
    <div className='search-bar'>
        <input
            placeholder='Type to search...' 
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{searchForDebounced(e.target.value);}}
        />
    </div>
  )
}

export default SearchBar