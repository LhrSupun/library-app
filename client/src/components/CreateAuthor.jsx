import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import { useNavigate } from 'react-router-dom';

const CreateAuthor = (props) => {
    const navigate = useNavigate();
    const [author, setAuthor] = useState({
       first_name:"", last_name:""
    });

    const onChange = (e) => setAuthor({ ...author, [e.target.name]: e.target.value });


    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/author', author)
            .then((res) => {
                setAuthor({
                    first_name: "", last_name: ""
                });

                const timer = setTimeout(() => {
                    navigate('/');
                }, 2000)
                return () => clearTimeout(timer);
            })
            .catch((authorErr) => {
                console.log({ authorErr })
                console.log('Error in Create Author!');
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
                        <h1 className='display-4 text-center'>Add Author</h1>
                        <p className='lead text-center'>Create new author</p>

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
        </div>
    );
};

export default CreateAuthor;