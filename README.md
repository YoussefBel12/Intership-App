Internship Management System
This project is an internship management system that facilitates the management of users, recruitment sessions, and candidatures. The system supports four user roles: User, Admin, Intern, and Supervisor. Below is an overview of the key functionalities and features implemented so far:

Key Features
User Authentication & Authorization
JWT Bearer Authentication: The system is secured using JWT Bearer tokens. Users log in with appropriate credentials and their roles are checked for authorized access.
Role-Based Access Control: Four user roles are supported: User, Admin, Intern, and Supervisor. Each role has specific access permissions to various resources and actions in the system.
Candidature Management
Candidature Creation: Users can post their candidature, which includes uploading a PDF CV file that is stored in the database.
Recruitment Sessions: A user can only submit their candidature if a recruitment session is active. Admins can create these sessions, and users are automatically assigned to the active session when they post their candidature.
Admin Features
CRUD Operations for Users: Admins can create, read, update, and delete users in the system.
User Role Management: Admins can modify user roles (e.g., assign Intern, Supervisor, Admin roles).
Password Management: Admins have access to a route that allows password changes for all accounts.
Dashboard: Admins can view a dashboard listing all users and all candidatures posted, along with the number of candidates in each recruitment session.
Supervisor Assignment: Admins can assign Supervisors to Interns. Both Interns and Supervisors can view each other's profiles and see the assigned supervisor-supervisee relationships.
User Features
Dashboard: Users have access to a dashboard where they can see the status of their candidature, active sessions, and the number of Interns in the system.
"Remember Me" Option: Users can choose to have their JWT token stored in localStorage for 7 days, extending the token expiration beyond the default 1 hour.
Design & UI Enhancements
The UI design has been enhanced using React, providing an intuitive and responsive user experience.
Role Statistics Dashboard: Admins can view a dashboard that displays the number of users for each role (User, Admin, Intern, Supervisor).
Future Improvements
Further Optimizations: Additional optimizations and performance improvements are planned to enhance the system's scalability and responsiveness.
Tech Stack
Frontend: React, Axios, React Router
Backend: ASP.NET Core API
Database: SQL Server (for storing users, candidatures, and recruitment sessions)
Authentication: JWT Bearer Tokens
Setup Instructions
Clone the repository.
Set up the backend API and connect it to your SQL Server instance.
Configure JWT authentication in the frontend.
Run the development server on http://localhost:3000 for the frontend and http://localhost:7157 for the backend.
Ensure the database is seeded with required data (e.g., users, sessions).
