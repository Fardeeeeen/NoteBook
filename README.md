# 📓 NoteBook

Welcome to the comprehensive documentation for the Notebook project. This document offers a detailed insight into the project's architecture, technologies used, features implemented, and how to run and deploy the application.

## 📖 Overview
The Notebook is a full-stack web application inspired by Google keep app, which aims at providing users with a versatile platform to manage their notes and drawings efficiently. It offers functionalities like creating, editing, archiving, and deleting notes, as well as creating, downloading and deleting drawings. The project leverages modern  technologies on both the frontend and backend to deliver a seamless user experience.

## 🛠️ Tech Stack

###  🖥️ Frontend 

- **React**: A JavaScript library for building user interfaces. React is the core framework used for developing the frontend of the Notebook application, providing components, state management, and routing.
- **HTML & CSS**: Used for structuring and styling the user interface components.
- **JavaScript (ES6+)**: Used for adding interactivity and dynamic behavior to the frontend components.
- **Axios**: A promise-based HTTP client for making API requests from the frontend to the backend server.
- **@material-ui/core**: A popular React UI framework for building responsive and customizable components.
- **@material-ui/icons**: A library of Material Design icons for use with React components.
- **@material-ui/pickers**: A date and time picker component library for Material-UI.

###  ⚙️ Backend

- **Node.js**: A JavaScript runtime environment used for building the backend server of the Notebook application.
- **Express.js**: A web application framework for Node.js used to create robust and scalable server-side applications.
- **PostgreSQL**: A powerful open-source relational database used for storing notes and drawings data.
- **Sequelize**: An ORM (Object-Relational Mapping) library for Node.js used for interacting with the PostgreSQL database, providing models, migrations, and query building capabilities.
- **Sharp**: A high-performance image processing library used for handling and processing images in the backend, specifically for drawings.
- **dotenv**: Used for loading environment variables from a .env file into process.env.
- **morgan**: A middleware used for logging HTTP requests in development mode.
- **cors**: A middleware used to enable Cross-Origin Resource Sharing (CORS) for handling requests from the frontend.


## ✨ Features

### 📝 Frontend Functionality
The frontend of the Notebook App includes a range of features to enhance user experience and productivity:

<strong> 📓 Notes </strong>

- **Create Notes**: Users can create new notes with a title, content, color, reminder, and labels.
- **Edit Notes**: Existing notes can be edited to update the title, content, color, reminder, and labels.
- **Label Management**: Labels can be added, deleted, and updated for better organization and categorization of notes.
- **Color Management**: Colors can be added to the notes , and each of these color can represent a meaning according to the users wish.
- **Reminder**: A reminder can be set to the note while being added , and these notes get added to the reminder page too.
- **Move to Trash**: Notes can be moved to the trash, allowing users to temporarily remove them without permanent deletion.
- **Delete Notes**: Users can delete notes permanently from the trash page.
- **Restore Notes**: Notes from the trash can be restored to their original state.
- **Archive Notes**: Users can archive notes for long-term storage and organization.
- **Unarchive Notes**: Archived notes can be unarchived and brought back to the main view.

<strong> 🎨 Drawings </strong>

- **Create Drawings**: Users can create drawings with lines and save them with associated metadata like height, width, and data URL.
- **Download Drawings**: Drawings can be downloaded after they have been saved.
- **Delete Drawings**: Drawings can be deleted permanently.
- **Preview Drawings**: Users can preview the saved drawing by clicking on them.

### 🔧 Backend Functionality
The backend of the Notebook App provides a robust set of APIs for interacting with notes and drawings:

<strong> Note APIs </strong>
- GET /api/notes: Retrieves all notes from the database.
- POST /api/notes: Creates a new note with the provided title, content, color, reminder date, labels, and image data (if applicable).
- PATCH /api/notes/:id/move-to-trash: Moves a note to the trash by setting its deleted field to true.
- PATCH /api/notes/:id/restore: Restores a note from the trash by setting its deleted field to false.
- DELETE /api/notes/:id: Permanently deletes a note from the database.
- PATCH /api/notes/:id/archive: Archives a note by setting its archived field to true.
- PATCH /api/notes/:id/unarchive: Unarchives a note by setting its archived field to false.
- PATCH /api/notes/:id/add-label: Adds a label to a note.
- PATCH /api/notes/:id/delete-label: Deletes a label from a note.
- PATCH /api/notes/:id/update-labels: Updates labels in a note.

 <strong> Drawing APIs </strong>
- GET /api/drawings: Retrieves all drawings from the database.
- POST /api/drawings: Creates a new drawing with the provided lines, data URL, height, and width.
- DELETE /api/drawings/:id: Deletes a drawing from the database.

## 🔄 Process

The Notebook project follows a modular and scalable architecture with a clear separation between the frontend and backend components. React is used for building the frontend user interface, providing a component-based approach to UI development. On the backend, Node.js with Express.js powers the server-side logic, handling HTTP requests, data processing, and database interactions. PostgreSQL serves as the database management system for storing notes and drawings data, while Sequelize facilitates seamless communication between the Node.js application and the PostgreSQL database.Sharp library is employed for efficient image processing in the backend, ensuring optimal handling of drawings.

### 📚 Learning Points

- **Frontend Development with React.js:**
  - **Component-Based Architecture:** Understanding the fundamentals of React.js architecture, including the concept of reusable and composable components, has been pivotal. 
  - **State Management with Hooks:** Exploring the use of React hooks for managing component state and side effects has provided a deeper understanding of state management in React 
    applications.
  - **Routing with react-router-dom:** Implementing routing using react-router-dom has demonstrated how to handle navigation and manage different views within a single-page application 
    effectively.
  - **UI Library Integration:** Integrating Material-UI for UI components and design elements has expanded proficiency in utilizing UI libraries to enhance the visual appeal and user 
    experience of web applications.

- **Understanding of RESTful API Design:**
  - **CRUD Operations:** Implementing Create, Read, Update, and Delete (CRUD) operations in RESTful APIs using Express.js has reinforced understanding of RESTful principles and HTTP 
    methods.
  - **Route Handling:** Learning how to define routes, handle request parameters, and send appropriate responses has honed skills in designing API endpoints for efficient data 
    communication.
  - **Creating RESTful APIs:** Building RESTful APIs for managing note and drawing data has involved designing resource endpoints, defining request/response formats, and adhering to 
    RESTful conventions for predictable and intuitive API behavior.

- **Deepened Understanding of Backend Development:**
  - **Node.js and Express.js Fundamentals:** Delving into the backend logic with Node.js and Express.js has provided insights into server-side development, middleware usage, and 
    request/response handling.
  - **Database Interactions with Sequelize ORM:** Working with Sequelize ORM for database interactions, including defining models, associations, and executing queries, has enhanced 
    proficiency in managing relational databases within Node.js applications.
  - **RESTful API Implementation:** Implementing RESTful APIs for handling note and drawing data has involved designing resource endpoints, parsing request payloads, and validating 
    input data to ensure robust API functionality.

- **Practical Experience with Sequelize and PostgreSQL:**
  - **Database Management Skills:** Managing PostgreSQL databases and utilizing Sequelize for ORM operations has fostered practical experience in database management, including schema 
    design, data manipulation, and transaction management.
  - **Migrations and Model Definitions:** Understanding database migrations and defining Sequelize models for representing database entities have been instrumental in maintaining 
    database schema consistency and version control.

- **Error Handling and Middleware Usage:**
  - **Middleware Configuration:** Configuring middleware functions in Express.js for logging, error handling, and request processing has provided insights into middleware stack 
     management and application-level middleware usage.
  - **Error Handling Strategies:** Implementing error handling middleware and error logging techniques has equipped with the ability to identify, handle, and log errors effectively, 
    ensuring application robustness and reliability.

- **API Integration with Axios:**
  - **Asynchronous HTTP Requests:** Making asynchronous HTTP requests to the backend server using Axios and handling responses asynchronously has improved proficiency in data fetching 
    and asynchronous programming paradigms in JavaScript.

- **Project Management:**
  - **Version Control with Git:** Utilizing Git for version control, branching strategies, and collaborative development workflows has enhanced project management skills and facilitated 
    effective team collaboration.
  - **Testing and Deployment:** Engaging in testing methodologies, including unit testing and integration testing, and deploying applications using platforms like Heroku or AWS has 
    provided practical experience in ensuring application quality and deployment readiness.

- **Continuous Learning and Growth:**
  - **Adaptability and Problem-Solving:** Embracing challenges and solving complex problems encountered during the development process has nurtured adaptability and problem-solving 
    skills, essential for navigating the dynamic landscape of software development.
  - **Community Engagement and Knowledge Sharing:** Actively participating in online communities, forums, and knowledge-sharing platforms has fostered continuous learning and 
    contributed to the exchange of ideas and best practices within the software development community.

### 🛠️ Improvements
While the Notebook App provides core functionality for managing notes and drawings, there are several areas for improvement:

1.User Authentication: Implement user authentication and authorization to secure user data and provide personalized experiences.
2.Login and Signup Functionality: Add login and signup functionality to allow users to create accounts and log in to access their notes and drawings.
3.Enhanced Drawing Features: Improve drawing functionality by adding features such as color selection, line thickness adjustment, and eraser tool.
4.Search and Filtering: Enhance note and drawing management with search and filtering options, allowing users to easily find and organize their content.
5.Optimization and Performance: Optimize backend APIs and frontend components for better performance and scalability, including database indexing, query optimization, and code bundling.
6.Enhanced Error Handling: Implementing more robust error handling mechanisms in both frontend and backend components to gracefully handle unexpected errors and edge cases.
7.Code Refactoring and Optimization: Conducting code refactoring and optimization to improve code readability, maintainability, and performance. Identifying and eliminating code smells, reducing redundancy, and adhering to best practices for code organization and structure.
8.User Experience Enhancements: Implementing user experience enhancements such as interactive features, real-time updates, and responsive design improvements to enhance usability and engagement.

## 🚀 Running the Project

To run the Notebook project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/notebook.git
    cd notebook
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    # For frontend (assuming React-based frontend)
    cd frontend
    npm install

    # For backend (assuming Node.js with Express.js)
    cd ../backend
    npm install
    ```

3. Set up a PostgreSQL database and update the `.env` file in the backend directory with the database connection details.

4. Start the backend server:

    ```bash
    # Inside the backend directory
    npm start
    ```

5. Start the frontend development server:

    ```bash
    # Inside the frontend directory
    npm start
    ```

6. Access the application at `http://localhost:3000`.

## 🚀 Deployment Instructions

To deploy the Notebook application, follow these general steps:

1. Set up a hosting provider (e.g., Heroku, AWS, DigitalOcean).
2. Configure environment variables for the production environment, including database connection details and any other required configurations.
3. Deploy the backend and frontend applications separately according to the hosting provider's deployment instructions.

## 🤝 Contributing Guidelines

Contributions to the Notebook project are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository's `main` branch.

## 📝 Dependencies

- **Frontend**:
  - @date-io/date-fns: ^1.3.13
  - @material-ui/core: ^4.12.4
  - @material-ui/icons: ^4.11.3
  - @material-ui/pickers: ^3.3.11
  - axios: ^1.6.7
  - react: 16.8.6
  - react-dom: 16.8.6
  - react-router-dom: ^6.22.1
  - react-scripts: ^5.0.1
  - react-canvas-draw: ^1.2.1
  - react-image-file-resizer: "^0.4.8"
  - date-fns: "^2.30.0"

- **Backend**:
  - axios: "^1.6.7"
  - bcrypt: ^5.1.1
  - body-parser: ^1.20.2
  - date-fns: ^2.30.0
  - dotenv: ^16.4.5
  - express: ^4.18.2
  - express-session: ^1.18.0
  - morgan: "^1.10.0"
  - multer: "^1.4.5-lts.1"
  - sharp: "^0.33.2"
  - cors: "^2.8.5",
  - pg: ^8.11.3
  - pg-hstore: ^2.3.4
  - sequelize: ^6.37.1

## Video or Image 📹🖼️
Images:
<img src = "" alt = "pages" />
<img src = "" alt = "pages" />
<img src = "" alt = "pages" />
<img src = "" alt = "pages" />
<img src = "" alt = "pages" />
<img src = "" alt = "pages" />

### 📧 Contact Information
For any inquiries or support, please contact [Fardeen Zubair](mailto:fardeenzubair@gmail.com).
