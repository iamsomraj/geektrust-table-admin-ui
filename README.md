# GeekTrust Admin UI Application - A User Management Interface

This Next.js application provides an interface for admins to view, edit, delete, and manage users fetched from an API. It is designed with ease of use and functionality in mind, implementing features such as search, filtering, pagination, and in-place editing.

## Run Locally

To set up and run the application locally, follow these steps:

1. **Open Terminal**

2. **Clone the Repository**

   ```bash
   git clone https://github.com/iamsomraj/geektrust-table-admin-ui.git
   ```

3. **Navigate to the Root Directory**

   ```bash
   cd geektrust-table-admin-ui
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Run the Application**

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:3000`.

## Features

### 1. **User Management**

- View a list of users with columns for `ID`, `Name`, `Email`, and `Role`.
- Column titles are distinct and visually separated from the entries.

### 2. **Search and Filter**

- A search bar with placeholder text starting with "Search".
- Supports filtering users by any property (`ID`, `Name`, `Email`, `Role`).

### 3. **In-Place Editing and Deletion**

- Edit user details directly in the table.
- Delete individual rows or multiple selected rows.
- Action buttons include:
  - `Edit` (class: `edit`)
  - `Delete` (class: `delete`)
  - `Save` (class: `save`)

### 4. **Pagination**

- Displays 10 rows per page.
- Pagination controls include:
  - `First Page` (class: `first-page`)
  - `Previous Page` (class: `previous-page`)
  - `Next Page` (class: `next-page`)
  - `Last Page` (class: `last-page`)
- Pagination dynamically updates based on search/filtering results.

### 5. **Row Selection**

- Select individual rows by clicking checkboxes.
- Delete all selected rows using the `Delete Selected` button.

## Developer Notes

1. **Data Fetching**

   - User data is fetched from the API:
     ```
     https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json
     ```

2. **Sorting**

   - Users are sorted by the `ID` field by default.

3. **No Persistence**

   - Edits and deletions occur in memory and are not persisted.

## Show Your Support

If you find this project useful, please give it a star! ⭐

## License

This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
