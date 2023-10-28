import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function ManageAuthorInfo(props) {
    const navigate = useNavigate();
    const [author, setAuthor] = useState({
        first_name: "", last_name: ""
    });
    const [updating, setUpdating] = useState(false);

    const onChange = (e) => setAuthor({ ...author, [e.target.name]: e.target.value });

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const controller = new AbortController();
            axios
                .get(`/author/${id}`, {
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
        }
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();
        setUpdating(true);
        if (id) {
            axios
                .put(`/author/${id}`, author)
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
                    setUpdating(false);
                });
        } else {
            axios
                .post('/author', author)
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
                    setUpdating(false);
                });
        }

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
                        <h1 className='display-4 text-center'>{id ? 'Update Author' : 'Add Author'}</h1>
                        <p className='lead text-center'>{id ? 'Update Author Info' : 'Add Author Info'}</p>
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
                                value={author?.first_name}
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
                                value={author?.last_name}
                                onChange={onChange}
                            />
                        </div>

                        <input
                            type='submit'
                            disabled={updating}
                            className='btn btn-outline-warning btn-block mt-4'
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ManageAuthorInfo;