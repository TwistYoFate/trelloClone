import BoardView from '../views/BoardView'
import useBoardVM from '../viewModels/useBoardVM'

function BoardController() {
  const {state,moveTask,updateTask,updateSearch,deleteTask} = useBoardVM();

  return (
    <BoardView {...state} moveTask={moveTask} updateTask={updateTask} updateSearch={updateSearch} deleteTask={deleteTask} />
  )
}

export default BoardController