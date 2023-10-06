import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import CreateBook from './components/CreateBook';
import './App.css'
import CreateAuthor from './components/CreateAuthor';
import UpdateBookInfo from './components/UpdateBookInfo';
import ShowAuthorsList from './components/ShowAuthorsList';
import UpdateAuthorInfo from './components/UpdateAuthorInfo';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<ShowBookList />} />
          <Route exact path='/view-authors' element={<ShowAuthorsList />} />
          <Route path='/create-book' element={<CreateBook />} />
          <Route path='/create-author' element={<CreateAuthor />} />
          <Route path='/edit-book/:id' element={<UpdateBookInfo />} />
          <Route path='/show-book/:id' element={<ShowBookDetails />} />
          <Route path='/edit-author/:id' element={<UpdateAuthorInfo />} />
          <Route path='/*' element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
