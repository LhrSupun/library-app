import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateBookInfo(props) {
    const [book, setBook] = useState({
        name: '',
        isbn: '',
        author: '',
        description: '',
        authorId: ''
    });
    
    const [authors, setAuthors] = useState([]);

    // const searchAuthor = useCallback((authorId) => {
    //     return authors.find(author => author._id === authorId)?.fullName || book.author
    // })

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get(`/book/${id}`, {
                signal: controller.signal
            })
            .then(({ data }) => {
                setBook({
                    name: data.name,
                    isbn: data.isbn,
                    author: data.author,
                    authorId: data.authorId,
                    description: data.description
                });
            })
            .catch((err) => {
                console.log('Error from UpdateBookInfo');
            });

        return () => controller.abort();
    }, [id]);

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

    const onChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: book.name,
            isbn: book.isbn,
            author: book.authorId,
            description: book.description
        };

        axios
            .put(`/book/${id}`, data)
            .then((res) => {
                const timer = setTimeout(() => {
                    navigate(`/show-book/${id}`);
                }, 2000);
                return () => clearTimeout(timer);
            })
            .catch((err) => {
                console.log('Error in UpdateBookInfo!');
            });
    };

    return (
        <div className='UpdateBookInfo'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <br />
                        <Link to='/' className='btn btn-outline-warning float-left'>
                            Show BooK List
                        </Link>
                    </div>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Edit Book</h1>
                        <p className='lead text-center'>Update Book's Info</p>
                    </div>
                </div>

                <div className='col-md-8 m-auto'>
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor='title'>Title</label>
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
                            <label htmlFor='isbn'>ISBN</label>
                            <input
                                type='text'
                                placeholder='ISBN'
                                name='isbn'
                                className='form-control'
                                value={book.isbn}
                                onChange={onChange}
                            />
                        </div>
                        <br />

                        <div className='form-group'>
                            {authors.length > 0 ? (
                                <select
                                    className='form-control'
                                    name='authorId'
                                    onChange={onChange}
                                >
                                    <option value={book?.authorId} disabled selected>{book?.author}</option>
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

                        <br />

                        <div className='form-group'>
                            <label htmlFor='description'>Description</label>
                            <textarea
                                type='text'
                                placeholder='Description of the Book'
                                name='description'
                                className='form-control'
                                value={book.description}
                                onChange={onChange}
                            />
                        </div>
                        <br />

                        <button
                            type='submit'
                            className='btn btn-outline-info btn-lg btn-block'
                        >
                            Update Book
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBookInfo;