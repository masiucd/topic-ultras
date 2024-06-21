# NutriCheck

NutriCheck is a comprehensive application that allows users to search for different foods and get detailed nutritional facts. This app is designed to help users make informed dietary choices by providing accurate and up-to-date nutritional information.

## Features

- **Food Search:** Easily search for various foods and view their nutritional information.
- **Detailed Nutritional Facts:** Get detailed information on calories, macronutrients, vitamins, minerals, and more.
- **User-Friendly Interface:** Simple and intuitive interface for a seamless user experience.
- **Database Integration:** Leverage a comprehensive database of foods and their nutritional profiles.
- **Responsive Design:** Accessible on multiple devices, including desktops, tablets, and smartphones.

## Getting Started

These instructions will help you set up and run the NutriCheck application on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MySQL (or any other preferred database)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/masiucd/nutri-check.git
   cd nutri-check
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   - Create a database named `nutricheck` in your MySQL server.
   - Run the provided SQL script to set up the necessary tables and insert initial data.

   ```bash
   mysql -u your-username -p nutricheck < database/schema.sql
   ```

4. **Configure environment variables:**

   - Create a `.env` file in the root directory.
   - Add your database credentials and any other necessary configuration.

   ```plaintext
   DB_HOST=localhost
   DB_USER=your-username
   DB_PASSWORD=your-password
   DB_NAME=nutricheck
   ```

5. **Start the application:**

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

- **Search for Foods:** Enter the name of the food you want to search for in the search bar and view its nutritional information.
- **View Detailed Nutrition Facts:** Click on any food item to see a detailed breakdown of its nutritional content.

## Contributing

We welcome contributions to NutriCheck! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- Thanks to all the contributors and the community for their support and valuable feedback.
- Special thanks to the developers of the libraries and tools used in this project.

## Contact

For any questions or feedback, please contact us at support@nutricheck.com.

---

Feel free to customize this README file according to your specific project details and requirements.
