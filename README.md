# home-decor-server

A project for learning and portfolio it's a RESTful API built with NodeJS + Express + MongoDB which receive all Post and user related data and save this data through a REST API.

This project is part of my personal portfolio and 
personal learning.

free!

## Getting Started

### Prerequisites

You'll need to have a basic environment with NodeJS 8+ installed. To use the database, you'll need to have MongoDB installed or use MongoDB Atlas

**Installing dependencies**
```
$ npm install
```

### Running Test
```
$ npm run test
```

## Routes

The base URL is: http://localhost:3000/home-decor/api/
The endpoints: /user
               /post
               /categories

### Models

#### Post
```json
{
    "_id": "",
    "category": "",
    "title": " ",
    "description": "",
    "user": {},
    "caminhoFoto": "",
    "postImage": "",
    "createdAt": ""
}
```
#### User
```json
{
    "posts": [],
    "_id": "",
    "name": "",
    "about": "",
    "caminhoFoto": "",
    "avatarImg": "",
    "createdAt": ""
}
```
#### Category
```json
{
    "CATEGORIES": [
        "Bedroom",
        "Closet",
        "Dining Room",
        "Garage",
        "Kitchen"
    ]
}
```

## Built With
- NodeJS 
- body-Parser 
- express
- MongoDB
- mongoose
- nodemon
- dotenv
- multer
- eslint
- JEST
- prettier
- super-test