import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

function ShowBookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get('http://localhost:5000/books?page=1&perPage=10', {
                signal: controller.signal,
            })
            .then((res) => {
                setBooks(res.data);
            })
            .catch((err) => {
                console.log({ err });
                console.log('Error from ShowBookList');
            });
        return () => controller.abort();
    }, []);

    const bookList =
        books.length === 0
            ? 'there is no book record!'
            : books.map((book, k) => <BookCard book={book} key={k} />);

    return (
        <div className='ShowBookList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Books List</h2>
                    </div>

                    <div className='col-md-11'>
                        <div className='row' >
                            <div className='col-md-2'>
                                <Link
                                    to='/create-book'
                                    className='btn btn-outline-warning float-right'
                                >
                                    + Add New Book
                                </Link>
                            </div>
                            <div className='col-md-2'>
                                <Link
                                    to='/create-author'
                                    className='btn btn-outline-danger float-right'
                                >
                                    + Add New Author
                                </Link>
                            </div>
                        </div>
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>

                <div className='list'>{bookList}</div>
            </div>
        </div>
    );
}

export default ShowBookList;