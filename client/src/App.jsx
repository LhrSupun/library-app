import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<ShowBookList />} />
          <Route path='/create-book' element={<h1>CreateBook</h1>} />
          <Route path='/edit-book/:id' element={<h1>UpdateBookInfo</h1>} />
          <Route path='/show-book/:id' element={<ShowBookDetails />} />
          <Route path='/*' element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
