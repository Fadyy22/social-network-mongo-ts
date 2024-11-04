# Social Network API

## This is the MongoDB version of the Social Network API. The PostgreSQL version can be found [here](https://github.com/Fadyy22/social-network-ts)

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [API Endpoints](#api-endpoints)
   - [Authentication](#authentication)
     - [Sign Up](#sign-up)
     - [Login](#login)
   - [Users](#users)
     - [Uploading Profile Image](#uploading-profile-image)
     - [Get My Profile](#get-my-profile)
     - [Get Profile](#get-profile)
     - [Add Friend](#add-friend)
     - [Accept Friend Request](#accept-friend-request)
   - [Posts](#posts)
     - [Create Post](#create-post)
     - [Get All Posts](#get-all-posts)
     - [Get Post](#get-post)
     - [Update Post](#update-post)
     - [Delete Post](#delete-post)
   - [Likes](#likes)
     - [Like Post](#like-post)
     - [Unlike Post](#unlike-post)
   - [Comments](#comments)
     - [Create Comment](#create-comment)
     - [Delete Comment](#delete-comment)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installation

1. Clone the repo
   `git clone https://github.com/Fadyy22/social-network-mongo-ts`

2. Navigate to the project directory
   `cd social-network-mongo-ts`

3. Install dependencies
   `npm install`

4. Create a `.env` file in the root directory and add your environment variables like .env.example

5. Build the project
   `npm run build`

6. Start the server
   `npm start`

## API Endpoints

### Authentication

#### Sign Up

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "firstName": "String",
    "lastName": "String",
    "email": "String",
    "password": "String"
  }
  ```

- **Response:**

  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "_id": "String",
        "firstName": "String",
        "lastName": "String",
        "email": "String",
        "password": "String",
        "friends": "Array",
        "friendRequests": "Array",
        "sentRequests": "Array",
        "createdAt": "String (Date)",
        "updatedAt": "String (Date)",
        "__v": "Number",
        "id": "String"
      },
      "token": "String"
    }
  }
  ```

#### Login

- **URL:** `/auth/login`

- **Method:** `POST`

- **Request Body:**

  ```json
  {
    "email": "String",
    "password": "String"
  }
  ```

- **Response:**

  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "_id": "String",
        "firstName": "String",
        "lastName": "String",
        "email": "String",
        "password": "String",
        "friends": "Array",
        "sentRequests": "Array",
        "friendRequests": "Array",
        "createdAt": "String (Date)",
        "updatedAt": "String (Date)",
        "__v": "Number",
        "id": "String"
      },
      "token": "String"
    }
  }
  ```

---

### Users

#### Uploading Profile Image

- **URL:** `/users/profile-img`

- **Method:** `PATCH`

- **Request Headers:** `Authorization: Bearer <token>`

- **Request Body:** Form Data

  ```json
    {
        "profileImg": File
    }
  ```

- **Response:**

  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "_id": "String",
        "firstName": "String",
        "lastName": "String",
        "email": "String",
        "password": "String",
        "friends": "Array",
        "sentRequests": "Array",
        "friendRequests": "Array",
        "createdAt": "String (Date)",
        "updatedAt": "String (Date)",
        "__v": 0,
        "profileImg": "String",
        "id": "String"
      }
    }
  }
  ```

#### Get My Profile

- **URL:** `/users/me`

- **Method:** `GET`

- **Request Headers:** `Authorization: Bearer <token>`

- **Response:**

  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "_id": "String",
        "firstName": "String",
        "lastName": "String",
        "email": "String",
        "friends": "Array",
        "createdAt": "String (Date)",
        "updatedAt": "String (Date)",
        "__v": 0,
        "posts": [
          {
            "_id": "String",
            "content": "String",
            "author": "String",
            "likesCount": "Number",
            "commentsCount": "Number",
            "media": "Array",
            "createdAt": "String (Date)",
            "updatedAt": "String (Date)",
            "__v": 0,
            "id": "String"
          }
        ],
        "id": "String"
      }
    }
  }
  ```

#### Get Profile

- **URL:** `/users/:id`

- **Method:** `GET`

- **Request Headers:** `Authorization: Bearer <token>`

- **Response:**

  ```json
    {
        "user": {
        "id": String,
        "firstName": String,
        "lastName": String,
        "email": String,
        "profile_img": null or String,
        "createdAt": String (Date),
        }
    }
  ```

#### Add Friend

- **URL:** `/users/:id/add`

- **Method:** `POST`

- **Request Headers:** `Authorization: Bearer <token>`

- **Response:**

  ```json
  {
    "message": "success"
  }
  ```

#### Accept Friend Request

- **URL:** `/users/:id/accept`

- **Method:** `POST`

- **Request Headers:** `Authorization: Bearer <token>`

- **Response:**

  ```json
  {
    "message": "success"
  }
  ```

---

### Posts

#### Create Post

- **URL:** `/posts`

- **Method:** `POST`

- **Request Headers:** `Authorization: Bearer <token>`

- **Request Body:**

  ```json
    {
        "content": String
    }
  ```

- **Response:**

  ```json
  {
    "status": "success",
    "data": {
      "post": {
        "_id": "String",
        "content": "String",
        "author": "String",
        "likesCount": "Number",
        "commentsCount": "Number",
        "media": "Array",
        "createdAt": "String (Date)",
        "updatedAt": "String (Date)",
        "__v": "Number",
        "id": "String"
      }
    }
  }
  ```

#### Get All Posts

- **URL:** `/posts`

- **Method:** `GET`

- **Request Headers:** `Authorization: Bearer <token>`

- **Response:**

  ```json
  {
    "status": "success",
    "data": {
      "posts": [
        {
          "_id": "String",
          "content": "String!",
          "author": {
            "_id": "String",
            "firstName": "String",
            "lastName": "String"
          },
          "likesCount": "Number",
          "commentsCount": "Number",
          "media": "Array",
          "createdAt": "String (Date)",
          "updatedAt": "String (Date)",
          "__v": "Number",
          "isLiked": "Boolean"
        }
      ]
    }
  }
  ```

#### Get Post

- **URL:** `/posts/:id`

- **Method:** `GET`

- **Request Headers:** `Authorization: Bearer <token>`

- **Response:**

  ```json
  {
    "status": "success",
    "data": {
      "post": {
        "_id": "String",
        "content": "String",
        "author": {
          "_id": "String",
          "firstName": "String",
          "lastName": "String"
        },
        "likesCount": "Number",
        "commentsCount": "Number",
        "media": "Array",
        "createdAt": "String (Date)",
        "updatedAt": "String (Date)",
        "__v": "Number",
        "comments": [
          {
            "_id": "String",
            "userId": "String",
            "postId": "String",
            "content": "String",
            "createdAt": "String (Date)",
            "updatedAt": "String (Date)",
            "__v": "Number",
            "user": [
              {
                "firstName": "String",
                "lastName": "String"
              }
            ]
          }
        ],
        "isLiked": "Boolean"
      }
    }
  }
  ```

#### Update Post

- **URL:** `/posts/:id`

- **Method:** `PATCH`

- **Request Headers:** `Authorization: Bearer <token>`

- **Request Body:**

  ```json
  {
    "content": String
  }
  ```

- **Response:**

  ```json
  {
    "status": "success",
    "data": {
      "post": {
        "_id": "String",
        "content": "String",
        "author": {
          "_id": "String",
          "firstName": "String",
          "lastName": "String",
          "id": "String"
        },
        "likesCount": "Number",
        "commentsCount": "Number",
        "media": "Array",
        "createdAt": "String (Date)",
        "updatedAt": "String (Date)",
        "__v": "Number",
        "id": "String"
      }
    }
  }
  ```

#### Delete Post

- **URL:** `/posts/:id`

- **Method:** `DELETE`

- **Request Headers:** `Authorization: Bearer <token>`

- **Response:** 204 No Content

---

### Likes

#### Like Post

- **URL:** `/posts/:id/like`

- **Method:** `POST`

- **Request Headers:** `Authorization: Bearer <token>`

- **Response:**

  ```json
  {
    "status": "success"
  }
  ```

#### Unlike Post

- **URL:** `/posts/:id/unlike`

- **Method:** `DELETE`

- **Request Headers:** `Authorization: Bearer <token>`

- **Response:** 204 No Content

---

### Comments

#### Create Comment

- **URL:** `/posts/:id/comments`

- **Method:** `POST`

- **Request Headers:** `Authorization: Bearer <token>`

- **Request Body:**

  ```json
    {
        "content": String
    }
  ```

- **Response:**

  ```json
  {
    "status": "success",
    "data": {
      "comment": {
        "userId": "String",
        "postId": "String",
        "content": "String",
        "_id": "String",
        "createdAt": "String (Date)",
        "updatedAt": "String (Date)",
        "__v": "Number",
        "id": "String"
      }
    }
  }
  ```

#### Delete Comment

- **URL:** `/posts/:postId/comments/:commentId`

- **Method:** `DELETE`

- **Request Headers:** `Authorization: Bearer <token>`

- **Response:** 204 No Content
