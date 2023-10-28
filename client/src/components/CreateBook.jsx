import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import { useNavigate } from 'react-router-dom';

const CreateBook = (props) => {
    const navigate = useNavigate();
    const [book, setBook] = useState({
        name: '',
        isbn: '',
        author: '',
        description: ''
    });

    const [authors, setAuthors] = useState([]);

    const onChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get('/authors', {
                signal: controller.signal,
            })
            .then((res) => {
                setAuthors(res.data);
            })
            .catch((bookErr) => {
                console.log({ bookErr });
                console.log('Error from AuthorsList');
            });
        return () => controller.abort();
    }, [])


    const onSubmit = (e) => {
        e.preventDefault();

        axios
            .post('/book', book)
            .then((res) => {
                setBook({
                    name: '',
                    isbn: '',
                    author: '',
                    description: ''
                });

                const timer = setTimeout(() => {
                    navigate('/');
                }, 2000)
                return () => clearTimeout(timer);
            })
            .catch((err) => {
                console.log('Error in CreateBook!');
            });
    };

    return (
        <div className='CreateBook'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <br />
                        <Link to='/' className='btn btn-outline-warning float-left'>
                            Show BooK List
                        </Link>
                    </div>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Add Book</h1>
                        <p className='lead text-center'>Create new book</p>

                        <form noValidate onSubmit={onSubmit}>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='Name of the Book'
                                    name='name'
                                    className='form-control'
                                    value={book.name}
                                    onChange={onChange}
                                />
                            </div>
                            <br />

                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='ISBN'
                                    name='isbn'
                                    className='form-control'
                                    value={book.isbn}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group'>
                                {authors.length > 0 ? (
                                    <select
                                        className='form-control'
                                        name='author'
                                        onChange={onChange}
                                    >
                                        <option value="" disabled selected>Select Author</option>
                                        {authors.map((author) => (
                                            <option key={author?._id} value={author?._id}>
                                                {author?.fullName}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <select className='form-control' name='author' disabled>
                                        <option value=''>No Authors</option>
                                    </select>
                                )}
                            </div>

                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='Describe this book'
                                    name='description'
                                    className='form-control'
                                    value={book.description}
                                    onChange={onChange}
                                />
                            </div>

                            <input
                                type='submit'
                                className='btn btn-outline-warning btn-block mt-4'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBook;