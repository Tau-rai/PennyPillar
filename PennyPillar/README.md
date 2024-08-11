# PennyPillar Backend API

This is the README document for the backend API of the PennyPillar financial web application implemented using Django.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The PennyPillar Backend API is responsible for handling all the server-side logic and data management for the PennyPillar financial web application. It is built using Django, a high-level Python web framework.

## Installation
To install and run the PennyPillar Backend API, follow these steps:
1. Clone the repository: `git clone https://github.com/Tau-rai/PennyPillar.git`
2. Navigate to the project directory: `cd PennyPillar`
3. Create a virtual environment: `python -m venv env`
4. Activate the virtual environment:
    - On Windows: `.\env\Scripts\activate`
    - On macOS and Linux: `source env/bin/activate`
5. Install the required dependencies: `pip install -r requirements.txt`
6. Set up the database: `python manage.py migrate`
7. Start the development server: `python manage.py runserver`

## Usage
Once the server is running, you can access the API endpoints using a tool like Postman or by making HTTP requests from your frontend application. Additionally, you can also access the API separately via the Swagger UI by navigating to `http://localhost:8000/swagger/` and providing the authentication token.

## Endpoints
The PennyPillar Backend API provides the following endpoints:

- `/api/register`: Handles user registration.
- `/api/login`: Handles user login and token generation.
- `/api/logout`: Handles user logout.
- `/api/myaccount`: Handles CRUD operations for user account.
- `/api/transactions`: Handles CRUD operations for financial transactions.
- `/api/categories`: Handles CRUD operations for transaction categories.
- `/api/reports`: Generates financial reports based on user data.

For detailed information on each endpoint and the supported request methods, refer to the API documentation.

## Authentication
The PennyPillar Backend API uses token-based authentication to secure the endpoints. To access protected endpoints, include the authentication token in the request headers.

## Contributing
Contributions to the PennyPillar Backend API are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License
No license has been specified for this project yet.

