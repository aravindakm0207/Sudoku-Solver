# User Authentication System & Sudoku Solver

This project combines two main functionalities:

1. **User Authentication System** with registration, login, and protected routes.
2. **Sudoku Solver** that allows users to input a Sudoku puzzle, validate it, and solve it using a backtracking algorithm.

## Features

### User Authentication System (Frontend)

- **User Registration**: Register with name, email, password, and phone number.
- **User Login**: Log in using email and password.
- **Private Routes**: Routes protected by JWT authentication, accessible only to logged-in users.
- **Input Validation**: Frontend validation for email, password, and phone fields.
- **Error Handling**: Displays error messages for invalid inputs or failed authentication.

### Sudoku Solver (Frontend)

- **Sudoku Board Input**: Input values (1-9) for each cell or leave blank for unknown values.
- **Validate Board**: Check if the board configuration is valid (no duplicates in rows, columns, or sub-grids).
- **Solve Sudoku**: Solves the Sudoku puzzle using a backtracking algorithm.
- **Hint Feature**: Provides hints for empty cells by filling them with valid numbers.
- **Error Display**: Shows an error message if the board is invalid or unsolvable.

## Technologies Used

- **Frontend**:
  - React for building the user interface.
  - React Router for routing between pages.
  - Axios for making HTTP requests.
  - Material UI for styling and components.
  - Validator for form validation.
  - Context API for managing authentication state.

- **Backend**:
  - MongoDB for the database.
  - Express.js for the web framework.
  - Node.js for the runtime environment.
  - bcryptjs for password hashing.
  - jsonwebtoken (JWT) for generating and verifying tokens.
  - Mongoose for database interaction.
  - MVC Architecture for organizing the project.

## Backend Setup

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
