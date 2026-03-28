# Calendar Tracking App - Frontend

The **Calendar Tracking App** is a web-based tool designed to help organizations manage and track their communications with external companies. This React-based application enables users to log, view, and track communication tasks while ensuring timely follow-ups and consistent engagement. The backend API supports functionalities like managing companies, communication methods, and scheduling, while the frontend provides a user-friendly interface to visualize and interact with these tasks.

---

## Features

### Admin Module
- **Company Management**: Allows admins to add, edit, or delete company details such as name, location, LinkedIn profile, contact emails, and phone numbers.
- **Communication Method Management**: Define and configure communication methods (e.g., LinkedIn Post, Email, Phone Call), including their sequence and whether they are mandatory in the communication cycle.

### User Module
- **Dashboard**: A grid view where users can quickly see the company name, last five communications, and the next scheduled communication with color-coded highlights.
- **Communication Logging**: Users can log new communications, specifying the type (e.g., LinkedIn Post, Email), date, and notes. This helps reset overdue or upcoming highlights for selected companies.
- **Interactive Features**: Hover effects on completed communications to display associated notes.
- **Notifications**: A dedicated notification section to display overdue communications and tasks due today.

### Calendar View
- View and manage past and upcoming communications in a calendar interface.

## Setup & Installation

### Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** (v12 or higher)
- **npm** (v6 or higher)
- **Git**

### Steps

1. **Clone the repository**

   Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/parthasarathy27/Calendar-Tracking-app-Frontend.git
   ```

2. **Install dependencies**

   Navigate to the project folder and install the required dependencies:

   ```bash
   cd Calendar-Tracking-app-Frontend
   npm install
   ```

3. **Start the development server**

   After installing the dependencies, run the following command to start the development server:

   ```bash
   npm start
   ```

   This will open the application in your browser at `http://localhost:3000`.

---

## Folder Structure

Here’s a brief overview of the project folder structure:

```
/calendar-app-frontend
  /public               # Static files
  /src                  # React source files
    /components         # Reusable components
    /pages              # Page components (Dashboard, Settings, etc.)
    /services           # API services and data handling
    /styles             # Global CSS or styled-components
    /utils              # Utility functions and helpers
  package.json          # Project dependencies and scripts
  README.md             # Project documentation
```

---

## Deployment

To deploy this project to a platform like **Vercel**, **Netlify**, or **GitHub Pages**:

1. **Build the project**:

   ```bash
   npm run build
   ```

2. Follow the platform-specific instructions to deploy the contents of the `build` folder.

---

## Testing & Validation

1. **Run tests**: We recommend running the tests locally to ensure everything works as expected.

   To run tests, use:

   ```bash
   npm test
   ```

2. **Validate the UI**: Ensure that all interactions, notifications, and color-coded highlights function correctly. Make sure the data appears as expected and is responsive across different screen sizes.

---

## Known Limitations

- Reporting and Analytics features are optional and may not be fully implemented in all versions.
- Some features may require additional backend services for full functionality.

---

## Technologies Used

- **React.js** for building the user interface.
- **React Router** for navigation and routing.
- **Redux** (optional) for global state management.
- **Axios** for making API requests.
- **CSS / SCSS** or **Tailwind CSS** for styling.
- **Chart.js** (optional) for rendering analytics and charts.

---

## Contributing

We welcome contributions to improve the project. If you'd like to contribute:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

---

### Additional Notes

- This project is part of a technical assignment to track communications with external companies and ensure timely follow-ups.
- It uses a modular, component-based structure to make the codebase scalable and easy to maintain.
