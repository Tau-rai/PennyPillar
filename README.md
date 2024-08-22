# README

# PennyPillar - Finance Tracker Web Application

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Backend (Django DRF)](#backend-django-drf)
- [Frontend (React)](#frontend-react)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
**PennyPillar** is a finance tracker application built to help users manage their income, expenses, budgets, and financial goals. Users can log transactions, set monthly budgets, track savings goals, and receive insights into their spending habits. The application also offers AI-powered daily financial insights and visual reports to provide a comprehensive view of financial health.

## Features
- User Authentication (Sign Up, Login, Logout) using JWT
- Dashboard with Financial Overview
- Add, Edit, and Delete Transactions (Income, Expenses)
- Categorize Transactions (e.g., Food, Rent, Entertainment)
- Reports and Analytics (Spending Trends, Monthly Summary)
- AI-Powered Daily Financial Insights (Gemini AI Integration)
- Budget Management (Set and Track Monthly Budgets)
- Savings Goals and Challenges
- Notifications for Bill/Subscription Due Dates
- Responsive and User-Friendly Interface

## Tech Stack
- **Frontend**: React, Axios, Bootstrap
- **Backend**: Django, Django REST Framework, MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **Task Queue**: Django Apscheduler
- **AI Integration**: Gemini AI API
- **API Documentation**: Swagger UI
- **Deployment**: Docker, Nginx, Jenkins (CI/CD)

## Setup and Installation
Follow these steps to set up the project locally.

### Prerequisites
- Python 3.9+
- Node.js 14+
- MySQL
- Docker (optional, for containerized deployment)

### Backend (Django DRF)
1. Clone the repository:
   ```bash
   git clone https://github.com/Tau-rai/PennyPillar.git
   cd PennyPillar/PennyPillar-Backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file and add the following:
   ```
   SECRET_KEY=your_secret_key
   DEBUG=True
   DATABASE_URL=mysql://user:password@localhost:3306/pennypillar
   GEMINI_API_KEY=your_gemini_api_key
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

5. Run database migrations:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

7. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend (React)
1. Navigate to the frontend directory:
   ```bash
   cd ../PennyPillar-Frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The React app should be running at `http://localhost:3000/`, while the Django API runs at `http://localhost:8000/`.

## API Documentation
The API is documented using Swagger. After running the Django server, you can access the documentation at:
```
http://localhost:8000/swagger/
```

## Usage
1. Register a new account or log in with an existing account.
2. Access the dashboard to view your financial summary.
3. Add income and expense transactions, categorized by type.
4. Set monthly budgets and track your progress.
5. Visualize your spending patterns using charts and reports.
6. Set savings goals and participate in challenges to achieve them.
7. Receive daily financial insights powered by Gemini AI.
8. Manage notifications for upcoming bills and subscriptions.


## Contributing
This application was developed by:

- [**Taurai Masaire**](https://github.com/Tau-rai) - Backend Engineer
- [**Avumile Ndlovu**](https://github.com/Aevy21) - Frontend Engineer

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.


## License
No Licence yet
