# Market 4 Test Space

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://www.google.com/search?q=%5Bhttps://nextjs.org/docs/app/api-reference/cli/create-next-app%5D\(https://nextjs.org/docs/app/api-reference/cli/create-next-app\)).

## Getting Started

### Prerequisites

To run this project, you will need:

  * Node.js (version 18.18.0 or newer)
  * `pnpm` (or `npm`/`yarn`)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-address>
    cd <project-folder-name>
    ```

2.  **Set up access to private packages:**

    To install dependencies, specifically the `@market-4-test/contract-ts` package, you need to create a `.npmrc` file in the root of the project with the following content:

    ```
    @market-4-test:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
    ```

    Replace `YOUR_GITHUB_TOKEN` with your personal GitHub access token with package read permissions.

3.  **Install dependencies:**

    ```bash
    pnpm install
    # or
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To start the server in development mode, run one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page will auto-update as you edit the file.

## Scripts

  * `dev`: Starts the development server using Turbopack (`next dev --turbopack`).
  * `build`: Creates a production build of the project (`next build`).
  * `start`: Starts the production server (`next start`).
  * `lint`: Runs the linter to check the code (`next lint`).

## Project Structure

  * **/app**: Contains your application's pages using the Next.js App Router.
      * `/products`: Page for managing products.
      * `/categories`: Page for managing categories.
      * `/tags`: Page for managing tags.
      * `/brands`: Page for managing brands.
  * **/core**: Contains the core business logic and reusable components.
      * `/containers`: Containers for managing collections and loading states.
      * `/hooks`: Custom hooks for accessing services and other functionalities.
      * `/models`: Data models used in the application (e.g., `ProductModel`, `CategoryModel`).
      * `/services`: Services for interacting with the API.
      * `/views`: User interface components (buttons, tables, layouts).
  * **next.config.ts**: Next.js configuration file.
  * **tsconfig.json**: TypeScript configuration file.

## Learn More

To learn more about Next.js, take a look at the following resources:

  * [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
  * [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome\!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
