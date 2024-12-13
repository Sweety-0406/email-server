# Email Server

This project implements a custom email server capable of sending and receiving emails using industry-standard protocols. The server supports SMTP for sending emails and IMAP for receiving emails. The application includes user authentication. 

---

## Features

1. **User Authentication**:
   - Login with username and password.
   - Secure authentication to prevent unauthorized access.

2. **Email Handling**:
   - Send emails via SMTP.
   - Retrieve received emails using IMAP.

3. **Security**:
   - Emails encrypted during transmission using STARTTLS/SSL/TLS.

4. **Interface**:
   - REST API endpoints for email operations.

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed on system.
- A valid email account for testing (e.g., Gmail).
- IMAP and SMTP access enabled for the email account.

### Clone the Repository
```bash
git clone https://github.com/Sweety-0406/email-server.git
cd email-server
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="your_db_url"
EMAIL_USER="your_email"
EMAIL_PASSWORD="your_email_passwrod"
JWT_SECRET="your_jwt_secret"
```

### Run the Server
```bash
npm run dev
```
The server will start at `http://localhost:3000` by default.

---

## API Documentation

### Base URL
`http://localhost:3000`

### Endpoints

#### **Send Email**
- **URL**: `/email/send`
- **Method**: `POST`
- **Description**: Sends an email using the SMTP protocol.
- **Request Body**:
  ```json
  {
      "recipient": "recipient@example.com",
      "subject": "Your Subject",
      "body": "Your email body."
  }
  ```
- **Response**:
  ```json
  {
      "message": "Email sent successfully."
  }
  ```

#### **Receive Emails**
- **URL**: `/email/receive`
- **Method**: `GET`
- **Description**: Fetches received emails from the IMAP server.
- **Response**:
  ```json
  {
      "Fetched Emails:": [
          {
              "from": "sender@example.com",
              "to": "recipient@example.com",
              "subject": "Email Subject",
              "date": "2024-12-13T05:31:57.000Z",
              "body": "Sender Message"
          }
      ]
  }
  ```

---


## Implementation Details

1. **Technologies Used**:
   - **Node.js**: Server-side JavaScript runtime.
   - **IMAP**: For retrieving emails.
   - **SMTP**: For sending emails.
   - **dotenv**: For managing environment variables.
   - **nodemailer**: For sending emails.
   - **imap-simple**: For interacting with IMAP servers.

2. **Security**:
   - STARTTLS/SSL/TLS ensures encrypted transmission of emails.

3. **Folder Structure**:
   - `src/index.js` contains the application code.
   - `src/controllers/emailController.js` contains logic for email operations.
   - `src/controllers/authController.js` contains logic for user authentication.
   - `src/routes/` defines API routes.

