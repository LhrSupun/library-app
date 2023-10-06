import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowBookDetails(props) {
    const [book, setBook] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get(`http://localhost:5000/book/${id}`, {
                signal: controller.signal,
            })
            .then((res) => {
                setBook(res.data);
            })
            .catch((err) => {
                console.log({ err });
                console.log('Error from ShowBookDetails');
            });
        return () => controller.abort();
    }, [id]);


    const BookItem = (
        <>
            <table className='table table-hover table-dark'>
                <tbody>
                    <tr>
                        <th scope='row'>1</th>
                        <td>Name</td>
                        <td>{book?.name}</td>
                    </tr>
                    <tr>
                        <th scope='row'>2</th>
                        <td>Author</td>
                        <td>{book?.author}</td>
                    </tr>
                    <tr>
                        <th scope='row'>3</th>
                        <td>ISBN</td>
                        <td>{book?.isbn}</td>
                    </tr>
                    <tr>
                        <th scope='row'>4</th>
                        <td>Description</td>
                        <td>{book?.description}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );

    return (
        <div className='ShowBookDetails'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-10 m-auto'>
                        <br /> <br />
                        <Link to='/' className='btn btn-outline-warning float-left'>
                            Show Book List
                        </Link>
                    </div>
                    <br />
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Book's Record</h1>
                        <p className='lead text-center'>View Book's Info</p>
                        <hr /> <br />
                    </div>
                    <div className='col-md-10 m-auto'>{BookItem}</div>
                    <div className='col-md-10 m-auto'>
                        <Link
                            to={`/edit-book/${id}`}
                            className='btn btn-outline-info btn-lg btn-block'
                        >
                            Edit Book
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowBookDetails;