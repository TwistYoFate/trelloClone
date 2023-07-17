import { ErrorBoundary } from 'react-error-boundary';
import './App.scss'
import BoardController from './controllers/BoardController';
import ErrorComponent from './views/components/errorComponent/ErrorComponent';

function App() {

  return (
    <>
    <ErrorBoundary fallback={<ErrorComponent />}>
      <BoardController />
    </ErrorBoundary>
    </>
  )
}

export default App
