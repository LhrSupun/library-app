import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateAuthorInfo(props) {
    const navigate = useNavigate();
    const [author, setAuthor] = useState({
        first_name: "", last_name: ""
    });

    const onChange = (e) => setAuthor({ ...author, [e.target.name]: e.target.value });


    // const searchAuthor = useCallback((authorId) => {
    //     return authors.find(author => author._id === authorId)?.fullName || book.author
    // })

    const { id } = useParams();

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get(`http://localhost:5000/author/${id}`, {
                signal: controller.signal
            })
            .then(({ data }) => {
                setAuthor({
                    first_name: data.first_name, last_name: data.last_name
                });
            })
            .catch((err) => {
                console.log('Error from UpdateBookInfo');
            });

        return () => controller.abort();
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/author/${id}`, author)
            .then((res) => {
                setAuthor({
                    first_name: "", last_name: ""
                });

                const timer = setTimeout(() => {
                    navigate('/view-authors');
                }, 2000)
                return () => clearTimeout(timer);
            })
            .catch((authorErr) => {
                console.log({ authorErr })
                console.log('Error in Update Author!');
            });
    };

    return (
        <div className='UpdateBookInfo'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <br />
                        <Link to='/view-authors' className='btn btn-outline-warning float-left'>
                            Show Authors List
                        </Link>
                    </div>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Edit Author</h1>
                        <p className='lead text-center'>Update Author's Info</p>
                    </div>
                </div>

                <div className='col-md-8 m-auto'>
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                            <input
                                type='text'
                                placeholder='First Name of the Author'
                                name='first_name'
                                className='form-control'
                                value={author.first_name}
                                onChange={onChange}
                            />
                        </div>
                        <br />

                        <div className='form-group'>
                            <input
                                type='text'
                                placeholder='Last Name of the Author'
                                name='last_name'
                                className='form-control'
                                value={author.last_name}
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
    );
}

export default UpdateAuthorInfo;