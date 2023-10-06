import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import CreateBook from './components/CreateBook';
import './App.css'
import UpdateBookInfo from './components/UpdateBookInfo';
import ShowAuthorsList from './components/ShowAuthorsList';
import ManageAuthorInfo from './components/ManageAuthor';

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
          <Route path='/*' element={
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div>
                <h1 style={{ textAlign: 'center', margin: 0, padding: '2rem' }}>
                  404 - Page Not Found
                </h1>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
