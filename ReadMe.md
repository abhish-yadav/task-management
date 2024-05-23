## Welcome Page

Welcome to our task management application! Here, you can efficiently manage your tasks and collaborate with others.

### Navigation Links:

- **Register**: Sign up for an account to access exclusive features.
- **Login**: Already have an account? Log in here.
- **Public Tasks**: Explore tasks that are publicly available.

Start organizing your tasks now and boost your productivity!

---

## Project Structure

### MVC Folder Structure

The project follows the MVC (Model-View-Controller) architecture pattern, which organizes code into three main components:

1. **Models**: Responsible for defining the data structure of your application. In your case, you have `user.Model.js` and `task.Model.js` defining the schemas for users and tasks, respectively.

2. **Views**: Represent the presentation layer of your application. You're using EJS templates (`*.ejs` files) for rendering HTML pages.

3. **Controllers**: Handle the application's logic and act as intermediaries between the models and views. You have separate controllers for authentication (`authController.js`), tasks (`taskController.js`), and public tasks (`publicTaskController.js`).

### Other Folders

- **Routes**: Contains the route handlers for different parts of your application. Routes are divided based on functionality, such as authentication, tasks, and public tasks.
- **Middlewares**: Houses the middleware functions, such as authorization middleware (`verification.js`), which verifies JWT tokens.
- **Utils**: Holds utility functions and constants shared across the application. For instance, `common.js` contains common status codes, messages, and functions for generating responses and tokens.
- **Views**: Contains the EJS templates for rendering HTML pages, such as registration, login, dashboard, and public views.

## Server Setup

Your server is set up in the `index.js` file, where you configure Express, connect to the database, define routes, set up middleware, and start the server.

## Database Connection

The database connection is established using Mongoose in the `utils/db.js` file, where you connect to MongoDB and handle events such as successful and failed connections.

## Middleware

Middleware functions are used to intercept and process requests before they reach the route handlers. In your project, you have a middleware for token authorization (`verification.js`) to ensure that only authenticated users can access certain routes.

## Routes

Routes define the endpoints of your application and map them to specific controller functions. You have separate routes for authentication, tasks, and public tasks, each corresponding to different functionalities of your application.

## Controllers

Controllers contain the logic for handling requests and generating responses. You have controllers for authentication, tasks, and public tasks, with functions for user registration/login, task CRUD operations, and public task operations.

## Utilities

Utilities include common functions and constants used throughout the application. These can include status codes, messages, and helper functions. In your project, you have a `common.js` file containing functions for generating responses and tokens.

## Running the Application

To run the application, you can use `npm start` for production mode or `npm run dev` for development mode. Ensure that the required environment variables are set in the `.env` file, including database URI and JWT secret key.

## Endpoints

List of the endpoints categorized by functionality, along with their corresponding HTTP methods and authorization requirements:

### Authentication Endpoints

1. **Register User**

   - Method: POST
   - Endpoint: `/auth/register`
   - Authorization: None

2. **Login User**
   - Method: POST
   - Endpoint: `/auth/login`
   - Authorization: None

### Task Endpoints

1. **Get User's Tasks**

   - Method: GET
   - Endpoint: `/tasks/`
   - Authorization: Required (JWT token)

2. **Filter User's Tasks**

   - Method: GET
   - Endpoint: `/tasks/filter`
   - Authorization: Required (JWT token)

3. **Create Task**

   - Method: POST
   - Endpoint: `/tasks/`
   - Authorization: Required (JWT token)

4. **Update Task**

   - Method: PATCH
   - Endpoint: `/tasks/:taskId`
   - Authorization: Required (JWT token)

5. **Delete Task**

   - Method: DELETE
   - Endpoint: `/tasks/:taskId`
   - Authorization: Required (JWT token)

6. **Collaborate on Task**
   - Method: POST
   - Endpoint: `/tasks/user_collab`
   - Authorization: Required (JWT token)

### Public Task Endpoints

1. **Get Public Tasks**

   - Method: GET
   - Endpoint: `/publicTasks/`
   - Authorization: None

2. **Filter Public Tasks**

   - Method: GET
   - Endpoint: `/publicTasks/filter`
   - Authorization: None

3. **Create Public Task**

   - Method: POST
   - Endpoint: `/publicTasks/`
   - Authorization: None

4. **Update Public Task**

   - Method: PATCH
   - Endpoint: `/publicTasks/:taskId`
   - Authorization: None

5. **Delete Public Task**
   - Method: DELETE
   - Endpoint: `/publicTasks/:taskId`
   - Authorization: None

These endpoints are categorized based on the functionality they provide, and the authorization requirement is specified for each endpoint, indicating whether a valid JWT token is needed to access the endpoint.

## Welcome Page

Welcome to our task management application! Here, you can efficiently manage your tasks and collaborate with others.

### Navigation Links:

- **Register**: Sign up
- **Login**: Already have an account? Log in here.
- **Public Tasks**: Explore tasks that are publicly available.

Start organizing your tasks now and boost your productivity!

---
