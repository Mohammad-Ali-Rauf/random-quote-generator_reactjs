import React, { useState } from 'react';
import axios from 'axios';

const RandomQuoteGenerator = () => {
  const [randomQuote, setRandomQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');

  const generateRandomQuote = async (category) => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/quotes?category=${category}`,
        {
          headers: {
            'X-Api-Key': 'wCWVrTvblpk+44X2AHoU5Q==XWQbG76kemi2eU5Y',
          },
          baseURL: 'https://cors-anywhere.herokuapp.com/',
        }
      );
      if (response.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * response.data.length);
        setRandomQuote(response.data[randomIndex].quote);
        setAuthor(response.data[randomIndex].author);
      } else {
        setRandomQuote(
          <span className='text-danger'>
            No quotes found for this category.
          </span>
        );
      }
    } catch (error) {
      console.log('Error fetching quotes:', error);
      setRandomQuote(
        <span className='text-danger'>
          Error fetching quotes. Please try again.
        </span>
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateRandomQuote(category);
  };

  const handleNextQuote = (event) => {
    event.preventDefault();
    setRandomQuote('');
  };

  return (
    <div className='container-fluid bg-white'>
      <h1 className='h1 text-center mt-3'>Quote of the day</h1>
      {randomQuote ? (
        <div className='quote-container text-center'>
          {randomQuote && (
            <p className='text-center mt-3 quote'>
              Quote: <span className='text-primary'>{randomQuote}</span>
            </p>
          )}
          {author && (
            <p className='text-center mt-3 author'>
              Author: <span className='text-secondary'>{author}</span>
            </p>
          )}
          <button className='btn btn-primary' onClick={handleNextQuote}>
            Next Quote
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='category' className='form-label'>
              What type of quote do you want? These are categories to select
              from: 'age', 'alone', 'amazing', 'anger', 'architecture', 'art',
              'attitude', 'beauty', 'best', 'birthday', 'business', 'car',
              'change', 'communications', 'computers', 'cool', 'courage', 'dad',
              'dating', 'death', 'design', 'dreams', 'education',
              'environmental', 'equality', 'experience', 'failure', 'faith',
              'family', 'famous', 'fear', 'fitness', 'food', 'forgiveness',
              'freedom', 'friendship', 'funny', 'future', 'god', 'good',
              'government', 'graduation', 'great', 'happiness', 'health',
              'history', 'home', 'hope', 'humor', 'imagination',
              'inspirational', 'intelligence', 'jealousy', 'knowledge',
              'leadership', 'learning', 'legal', 'life', 'love', 'marriage',
              'medical', 'men', 'mom', 'money', 'morning', 'movies', 'success'
            </label>
            <input
              type='text'
              className='form-control mt-3'
              id='category'
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder='Enter category'
            />
          </div>
          <button type='submit' className='btn btn-success'>
            Generate Quote
          </button>
        </form>
      )}
    </div>
  );
};

export default RandomQuoteGenerator;
