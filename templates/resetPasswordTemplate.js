const resetPasswordTemplate = (resetUrl) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
            text-align: center;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
          }
          .reset-button {
            display: inline-block;
            padding: 12px 25px;
            margin: 20px auto;
            font-size: 18px;
            font-weight: bold;
            color: #ffffff;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #aaa;
            margin-top: 30px;
          }
          .container p {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Reset Request</h1>
          <p>Hi,</p>
          <p>You have requested to reset your password. Please click the button below to reset your password:</p>
          <a href="${resetUrl}" class="reset-button">Reset Password</a>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <div class="footer">
            <p>Thank you,<br>Ikash Dev Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
};

module.exports = resetPasswordTemplate;
