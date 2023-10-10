# Single Vendor NestJS E-Commerce Store

Welcome to the Single Vendor E-Commerce Store project! This is a simple e-commerce platform designed for single vendors to showcase and sell their products online. This README will guide you through the setup, configuration, and usage of the application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed (version >= 12.0)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) (Node Package Manager) installed
- [Postgres](https://www.postgresql.org/) installed and running

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/ehtishamaliofficial/e-commerce-nestjs-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd e-commerce-nestjs-backend
   ```

3. Install the project dependencies:

   ```bash
   yarn
   ```

## Configuration

1. Create a `.env` file in the project root directory with the following environment variables:

   ```env
   DATABASE_URL=your-postgres-connection-uri
   JWT_SECRET=your-secret-key-for-session-management
   ```

   Replace `your-connection-url` and `your-secret-key-for-session-management` with your actual Postgres connection URL and a secure secret key.

2. Customize the application by editing the configuration files in the `config` directory (e.g., `config/db.js` for database configuration).

## Usage

1. Start the application:

   ```bash
   yarn start:dev
   ```

   The application will be available at `http://localhost:3000`.

2. Open your web browser and navigate to `http://localhost:3000` to access the e-commerce store.

3. Register as a vendor, add products, and manage your store through the provided user interface.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Make your changes and commit them.

4. Push your changes to your fork.

5. Create a pull request to the original repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README to provide more specific information about your e-commerce store project. Make sure to keep it updated as your project evolves, and provide clear instructions for users and contributors.
