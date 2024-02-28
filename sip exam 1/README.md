# MoodFood - Food Delivery and Ordering Website

MoodFood is a full-stack web application designed to provide users with a convenient platform for ordering food online. This project utilizes MongoDB, ExpressJS, ReactJS, Node.js, and Bootstrap to create a seamless and user-friendly experience for customers to browse menus, place orders, and have food delivered to their doorstep.

## Features

- **User Authentication:** Secure user authentication system allowing customers to create accounts, log in, and manage their profiles.
- **Browse Menu:** Users can explore a variety of food items available for order, with detailed descriptions and prices.
- **Order Placement:** Seamless order placement process with the ability to add multiple items to the cart and proceed to checkout.
- **Order Tracking:** Users can track the status of their orders from confirmation to delivery.
- **Admin Panel:** An admin interface to manage menus, view orders, and handle user data.

## Technologies Used

- **MongoDB:** A NoSQL database used to store user information, menu items, orders, and other application data.
- **ExpressJS:** Node.js framework used for building the backend server and handling HTTP requests.
- **ReactJS:** Frontend library for building the user interface, providing a dynamic and responsive experience.
- **Node.js:** Server-side JavaScript runtime environment for running the backend server.
- **Bootstrap:** Frontend framework for designing responsive and mobile-first websites.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/theasthana/MoodFood.git
    cd MoodFood
    ```

2. Install dependencies:

    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `/server` directory.
    - Add necessary environment variables (e.g., MongoDB connection string, JWT secret, etc.).

4. Run the application:

    ```bash
    # Start the server
    cd server
    npm start

    # Start the client
    cd ../client
    npm start
    ```

5. Access the application by visiting `http://localhost:3000` in your browser.

## License

This project is open source.
