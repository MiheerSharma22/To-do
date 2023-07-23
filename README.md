# Overview

A full stack to-do application that keeps track of your todos. You can edit, delete, update or create a new to-do.

# Tech Stack

- HTML5
- CSS3
- Tailwind CSS
- React.Js
- Redux
- Node.Js
- Express.Js
- MongoDB

# Features

- User can Login / SignUp to create a new account.
- Once logged in, previously created todos are automatically fetched and displayed.
- Updation, Deletion, Creation of a new Todo can be done upon logging in.

# Challenges I Faced

- One major challenge was to persist the user once he/she logs in, as on every reload the user became undefined. I overcame this problem by saving current logged in user's email into local storage and clearing local storage after user logs out.

# My Learnings

- A new learning for me was, how to make user persisit once he/she logs in using local storage.
- Furthermore, developed a deeper understanding of creating robust APIs in node.js. Learned how a request is processed on the backend and implemented error handling to send appropriate and error free responses.
- Got to work with CORS and its configuration settings.
- Experienced how a full stack app is deployed on a serverless technology like vercel.
