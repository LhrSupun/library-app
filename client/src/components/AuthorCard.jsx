import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import authorLogo from '../assets/blank-profile-picture.png';



const AuthorCard = (props) => {
    const author = props.author;
    return (
        <div className='card'>
            <img
                src={authorLogo}
                alt='Author'
                height={200}
                className='card-img-top'
            />
            <div className='card-body text-center text-dark bg-light rounded-bottom shadow-sm'>
                <h3>
                    <Link to={`/edit-author/${author._id}`}>{author?.fullName}</Link>
                </h3>
                <h4 className="card-subtitle mb-2">Books:</h4>
                {author?.books.length > 0 ? (
                    <ul className="list-group">
                        {author?.books.map((book) => (
                            <li className="list-group-item" key={book._id}>
                                <Link to={`/show-book/${book._id}`}>{book.name}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Books</p>
                )}
            </div>
        </div>
    );
};

export default AuthorCard;