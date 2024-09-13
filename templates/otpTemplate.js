const otpTemplate = (email, otp) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP Verification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #ffffff; /* White background */
                  color: #333333; /* Dark Gray for general text */
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
              }
              h1 {
                  color: #0056b3; /* Dark Blue for heading */
              }
              p {
                  font-size: 16px;
                  line-height: 1.5;
              }
              .otp {
                  font-size: 24px;
                  font-weight: bold;
                  margin: 20px 0;
                  color: #007bff; /* Bright Blue for OTP */
              }
              .footer {
                  margin-top: 30px;
                  font-size: 14px;
                  color: #777777; /* Light Gray for footer text */
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Your OTP Code</h1>
              <p>Hello,</p>
              <p>You requested an OTP for the email address <strong>${email}</strong>. Please use the following OTP to verify your account:</p>
              <div class="otp">${otp}</div>
              <p>This OTP is valid for 5 minutes. Do not share the OTP with anyone.</p>
              <p>If you did not request this OTP, please ignore this email.</p>
              <div class="footer">
                  <p>Thank you for choosing our service!</p>
              </div>
          </div>
      </body>
      </html>
    `;
};

module.exports = otpTemplate;