import request from 'supertest';
import { expect } from 'chai';
import app from './index';

describe('GET', () => {
  it('should return "Hello World!"', async () => {
    const response = await request(app).get('/');
    expect(response.text).to.equal('Hello World!');
  });

  it('should return status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
  });

  it('/nonexistent-route should return 404', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.status).to.equal(404);
  });
});

describe('GET /books', () => {
  it('should return status code 200', async () => {
    const response = await request(app).get('/books');
    expect(response.status).to.equal(200);
  });

  it('should return an array of books', async () => {
    const response = await request(app).get('/books');
    expect(response.body).to.be.an('array');
  });

  it('should return the right book', async () => {
    const expectedBook = {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      pages: 180,
      publisher: 'Scribner',
      isbn: '978-0-7475-3269-9',
    };
    const response = await request(app).get('/books');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    // Check if the response body contains the expected book
    const returnedBook = response.body.find((book) => book.id === expectedBook.id);
    expect(returnedBook).to.deep.equal(expectedBook);
  });
});
