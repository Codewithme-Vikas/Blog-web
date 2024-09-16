const { formatDate } = require("../../utils/helperFun");

const postCreatedTemplate = (title, createdAt) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Post Created</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #ffffff;
                  color: #333333;
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
                  border: 1px solid #ddd;
                  background-color: #f7f7f7;
              }
              h1 {
                  color: #4CAF50;
              }
              p {
                  font-size: 16px;
                  line-height: 1.5;
              }
              .title {
                  font-weight: bold;
                  color: #162447;
              }
              .footer {
                  margin-top: 30px;
                  font-size: 14px;
                  color: #bbbbbb;
              }
              .btn {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #4CAF50;
                  text-decoration: none;
                  border-radius: 5px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Post Created Successfully!</h1>
              <p>Dear User,</p>
              <p>We are excited to inform you that your post titled <span class="title">"${title}"</span> has been successfully created on <strong>${formatDate(createdAt)}</strong>.</p>
              <p>You can now view and share your post with others!</p>
              <a href="#" class="btn">View Your Post</a>
              <div class="footer">
                  <p>Thank you for using our platform.</p>
              </div>
          </div>
      </body>
      </html>
    `;
};

module.exports = postCreatedTemplate;
