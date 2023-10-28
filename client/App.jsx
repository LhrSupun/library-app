import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import CreateBook from './components/CreateBook';
import './App.css'
import UpdateBookInfo from './components/UpdateBookInfo';
import ShowAuthorsList from './components/ShowAuthorsList';
import ManageAuthorInfo from './components/ManageAuthor';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<ShowBookList />} />
          <Route exact path='/view-authors' element={<ShowAuthorsList />} />
          <Route path='/create-book' element={<CreateBook />} />
          <Route path='/create-author' element={<ManageAuthorInfo />} />
          <Route path='/edit-book/:id' element={<UpdateBookInfo />} />
          <Route path='/show-book/:id' element={<ShowBookDetails />} />
          <Route path='/edit-author/:id' element={<ManageAuthorInfo />} />
          <Route path='/not-found' element={<PageNotFound />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
