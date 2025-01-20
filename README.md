


# GeoPoly Mapper

![GeoPoly Mapper UI image](/images/geopoymapper_ui.gif)

**GeoPoly Mapper** is a powerful web application designed to assist in UAV flight planning. It enables users to generate precise flight boundaries (outer polygons) using processed orthophotos or multispectral imagery. The tool is tailored for applications such as agricultural spraying, terrain mapping, and environmental monitoring. With its modular design, this application is set to evolve with advanced features in future releases.

---

## Features

- **Flight Boundary Definition:** Easily create accurate flight boundaries from orthophotos.
- **Terrain Analysis:** Analyze geographic data to optimize UAV operations.
- **Exportable Flight Plans:** Generate actionable plans ready for UAV integration.
- **Use Cases:**
  - Agricultural spraying for targeted resource application.
  - Mapping for topographical and infrastructural planning.
  - Environmental monitoring and assessment.

---

## Prerequisites

Ensure the following requirements are met before running the application:

1. **System Requirements:**
   - OS: Windows, macOS, or Linux.
   - RAM: Minimum 4 GB.
   - Storage: Minimum 500 MB free space.

2. **Dependencies:**
   - Node.js (v16 or later)
   - React (for development)
   - WebODM (for UAV image processing)

3. **Installation Requirements:**
   - A WebODM instance running locally or accessible via URL.
   - A browser that supports modern JavaScript features (Chrome/Firefox recommended).

---

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sidharthmohannair/GeoPoly-Mapper.git
   cd geopoly-mapper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the WebODM server:

   - Navigate to your WebODM installation directory.
   - Run the following command:
   ```bash
   ./webodm.sh start
   ```
   - Ensure WebODM is running and accessible at http://localhost:8000.


4. Start the GeoPoly Mapper application from `/GeoPoly-Mapper` directory :
   ```bash
   npm start
   ```

5. Open the **GeoPoly Mapper** application in your browser at 
   > [http://localhost:3000](http://localhost:3000)

---

## How to Use

1. **Start WebODM:**
   - Ensure the WebODM server is running **before launching GeoPoly Mapper**.
2. **Login:**
   - Enter your WebODM credentials on the login screen.
   - Click "**Connect to WebODM**" to establish a session.

3. **Step 1:** Process Orthophotos
   - Access the WebODM dashboard within the app.
   - Upload and process your imagery.

4. **Step 2:** Define Flight Plan
   - Switch to the flight plan creation tool.
   - Use the interface to analyze and define flight boundaries.
   - Export the finalized flight plan for UAV operations.

5. **Logout:**
   - Use the "Logout" button to securely end your session when done.

---
## Expected Outcomes

- Generate accurate flight plan boundaries based on processed geographic imagery.
- Improve efficiency in UAV applications such as spraying and mapping.
- Provide a flexible platform for future feature additions.

---
## Contribution

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License
This project is open-source and available under the [MIT License](/LICENSE).

## Changelog

For details about the project's version history, refer to the [CHANGELOG.md](/CHANGELOG.md).


