# 🧑‍💻 GitHub Explorer

A modern and responsive GitHub Dashboard/Explorer built with **Next.js**, **Tailwind CSS**, and **Axios**, that allows you to search for any GitHub user and view their profile, repositories, and followers in a clean and interactive UI.

🔗 Live Demo: [github-explorer-ivory-eta.vercel.app](https://github-explorer-ivory-eta.vercel.app/)

## 🚀 Features

### 🔍 Search by Username

- Type in any GitHub username to view their information.
- Search to fetch profile, repositories, and followers dynamically.
- Displays an error message if the username does not exist or the API fails.

### 👤 User Profile Page

- Fetches and displays:
  - Name
  - Username
  - Avatar
  - Location
  - Bio
  - Number of public repositories
  - Number of followers
- API Endpoint: `https://api.github.com/users/{username}`

### 📦 Repositories Page

- Fetches all public repositories for the user.
- Displays:
  - Repository name
  - Description
  - Number of stars
- Supports sorting repositories by stars (ascending / descending).
- API Endpoint: `https://api.github.com/users/{username}/repos`

### 🤝 Followers Page

- Fetches all followers for the user (paginated).
- Displays:
  - Avatar
  - Name
  - Username
  - Link to follower's GitHub profile
- Shows total number of followers.
- API Endpoint: `https://api.github.com/users/{username}/followers`


## 🛠️ Built With

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [GitHub REST API](https://docs.github.com/en/rest)

## 🔧 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/john-papani/github-explorer.git
   cd github-explorer
   ```
2. Install dependencies:

   ```bash
   npm install --force 
   ```

3. Set up environment variables:
   Create a .env file and add your GitHub token:

   ```
   NEXT_PUBLIC_GITHUB_TOKEN=your_personal_access_token
   ```

   > A GitHub token is recommended to avoid API rate limits.

4. Run the development server:

   ```
   npm run dev
   ```

5. Visit your app:

   Open http://localhost:3000 in your browser.
   


### Total time for project ~ 9 hours
