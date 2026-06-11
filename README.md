# JWT Authentication Project

This project is a simple Node.js application demonstrating JSON Web Token (JWT) based authentication. It uses Express for the web server, Mongoose for MongoDB interaction, and `jsonwebtoken` for generating and verifying tokens.

## Prerequisites
- **Node.js** installed on your system.
- **MongoDB** running locally or a MongoDB Atlas URI (ensure you have your `.env` configured).

## Project Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd JWT_Token/simple_jwt
   ```

2. **Install the dependencies**:
   Inside the `simple_jwt` directory, run the following command to download all required libraries:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Ensure you configure the `.env` file in the `simple_jwt` directory. You will typically need to define variables like your Database URI and JWT Secret.

## How to Run the Project

You can run this project in two modes:

- **Production Mode**:
  Runs the server using Node.js.
  ```bash
  npm start
  ```

- **Development Mode**:
  Runs the server using `nodemon`, which automatically restarts the server when code changes are made.
  ```bash
  npm run dev
  ```

## Included Libraries (Dependencies)

The following libraries are downloaded and used in this project:

**Dependencies:**
- [`express`](https://www.npmjs.com/package/express) (^4.21.0) - Fast, unopinionated, minimalist web framework for Node.js.
- [`mongoose`](https://www.npmjs.com/package/mongoose) (^8.7.1) - Elegant MongoDB object modeling for Node.js.
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) (^9.0.2) - An implementation of JSON Web Tokens to securely transmit information.
- [`bcryptjs`](https://www.npmjs.com/package/bcryptjs) (^2.4.3) - Library to help you hash passwords.
- [`dotenv`](https://www.npmjs.com/package/dotenv) (^16.4.5) - Loads environment variables from a `.env` file into `process.env`.

**Dev Dependencies:**
- [`nodemon`](https://www.npmjs.com/package/nodemon) (^3.1.7) - A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
additional:[`postmen`](https://nadullaknidu7-4880383.postman.co/workspace/postmen-acadamy~a7e61346-0351-4556-bab2-ca045a1f4f85/collection/50951538-d9ecd075-711a-4e08-a03f-871db1eb58fe?action=share&creator=50951538)-check to create APIs
