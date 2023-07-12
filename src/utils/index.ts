import { IBoardContext } from "../data/boardContext";

/**
 * This is a function used to apply debouncing on a function
 */
export function debounce(fn:Function,d:number):Function{
    let timer;
    return function(...args){
         if(timer) clearTimeout(timer);
         timer = setTimeout(()=>fn(...args),d);
    }
}

export function cacheBoardData(data:IBoardContext){
    const stringifiedData = JSON.stringify(data);
    sessionStorage.setItem("boardData",stringifiedData);
}

 export default {
    debounce,
    cacheBoardData
 }