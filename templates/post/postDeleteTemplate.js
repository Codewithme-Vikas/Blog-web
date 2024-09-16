const {formatDate} = require("../../utils/helperFun");

const postDeleteTemplate = (title, createdAt) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Post Deleted</title>
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
                  color: #e94560;
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
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Post Deleted</h1>
              <p>Hello,</p>
              <p>Your post titled <span class="title">"${title}"</span>, created on <strong>${formatDate(createdAT)}</strong>, has been deleted.</p>
              <p>If you have any questions or believe this is an error, feel free to contact our support team.</p>
              <div class="footer">
                  <p>Thank you for using our service.</p>
              </div>
          </div>
      </body>
      </html>
    `;
};

module.exports = postDeleteTemplate;