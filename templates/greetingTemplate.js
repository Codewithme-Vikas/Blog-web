module.exports = (username) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Our Website</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #ffffff; /* White background */
                  color: #333333; /* Dark Gray text */
                  margin: 0;
                  padding: 0;
                  text-align: center;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
                  background-color: #f8f9fa; /* Light background for the container */
              }
              h1 {
                  color: #007bff; /* Bright Blue for heading */
              }
              p {
                  font-size: 16px;
                  line-height: 1.5;
              }
              .username {
                  font-size: 20px;
                  font-weight: bold;
                  color: #28a745; /* Green for username */
              }
              .footer {
                  margin-top: 30px;
                  font-size: 14px;
                  color: #6c757d; /* Gray for footer text */
              }
              .btn {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #007bff; /* Bright Blue for button */
                  text-decoration: none;
                  border-radius: 5px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome to Our Website!</h1>
              <p>Dear <span class="username">${username}</span>,</p>
              <p>Thank you for signing up on our platform. We are excited to have you as part of our community!</p>
              <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
              <a href="#" class="btn">Get Started</a> <!-- Optional button -->
              <div class="footer">
                  <p>Best Regards,<br>Ikash Dev</p>
              </div>
          </div>
      </body>
      </html>
    `;
};
