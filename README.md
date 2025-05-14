1. Title
Role-Based Authentication Booking List 

2. What Project Does
This project is a full-stack web application that demonstrates secure role-based authentication using Google Sign-In.

Users can sign in with their Gmail account, select a role (admin or guest), and access features based on their role:
(i)Admin users can create, read, update, and delete booking entries (Name, Address, PIN, Phone Number).
(ii)Guest users can only view the booking entries created by admins.

The application is mobile-friendly and features a clean, modern interface.

3. Tech Stack Used

Frontend: React, Bootstrap, Axios, React Router

Backend: Node.js, Express.js, Passport.js (Google OAuth 2.0), express-session, CORS, Mongoose

Database: MongoDB Atlas (Cloud)

Authentication: Google OAuth 2.0 (via Passport.js)


4. Features of the Application
   
(i)Google Sign-In: Secure login using Google OAuth 2.0.

(ii)Role Selection: First-time users select their role (admin or guest).

(iii)Role-Based Dashboard:

Admin: Add new booking entries via a form (Name, Address, PIN, Phone Number). View, edit, and delete all entries.

Guest: View all booking entries (read-only).

(iv)Logout: One-click logout for all users.

(v)Responsive UI: Mobile-friendly and clean interface using Bootstrap.

(vi)Protected Routes: Only authenticated users can access dashboards; role selection is enforced for new users.
