import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthorCard from './AuthorCard';

function ShowAuthorsList() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get('/authors?page=1&perPage=20', {
                signal: controller.signal,
            })
            .then((res) => {
                setAuthors(res.data);
            })
            .catch((ShowAuthorsList) => {
                console.log({ ShowAuthorsList });
                console.log('Error from ShowAuthorsList');
            });
        return () => controller.abort();
    }, []);

    const authorsList =
        (!Array.isArray(authors) || authors.length === 0)
            ? 'there is no author record!'
            : authors.map((author, k) => <AuthorCard author={author} key={k} />);

    return (
        <div className='ShowBookList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Authors List</h2>
                    </div>

                    <div className='col-md-11'>
                        <div className='row' >
                            <div className='col-md-2'>
                                <Link
                                    to='/create-book'
                                    className='btn btn-outline-warning float-right'
                                >
                                    + Create New Book
                                </Link>
                            </div>
                            <div className='col-md-2'>
                                <Link
                                    to='/create-author'
                                    className='btn btn-outline-danger float-right'
                                >
                                    + Create New Author
                                </Link>
                            </div>
                            <div className='col-md-2'>
                                <Link
                                    to='/'
                                    className='btn btn-outline-light float-right'
                                >
                                    Books List
                                </Link>
                            </div>
                        </div>
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>

                <div className='list'>{authorsList}</div>
            </div>
        </div>
    );
}

export default ShowAuthorsList;