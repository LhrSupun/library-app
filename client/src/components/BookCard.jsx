import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import bookLogo from '../assets/book.jpg';

const BookCard = (props) => {
    const book = props.book;

    return (
        <div className='card'>
            <img
                src={bookLogo}
                alt='Books'
                height={200}
                className='card-img-top'
            />
            <div className='card-body text-center text-dark bg-light rounded-bottom shadow-sm'>
                <h2>
                    <Link to={`/show-book/${book._id}`}>{book.name}</Link>
                </h2>
                <h3>{book.author}</h3>
                <p>{book.description}</p>
            </div>
        </div>
    );
};

export default BookCard;