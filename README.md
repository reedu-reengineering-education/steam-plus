<div align="center">
  <h3 align="center">re:edu App</h3>

  <p align="center">
     🚀 Template for re:edu map based applications
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

The PVP App is a web based system to visualize the distribution process of teaching students.

Features:

- 🗺 Map based distribution visualization
- 📊 Additional chart visualizations
- 🏎 Fast

### Built With

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)

<!-- GETTING STARTED -->

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Prerequisites

You will need to have Node.js and Yarn installed.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/reedu-reengineering-education/next-map-starter.git
   ```
2. Install NPM packages
   ```sh
   yarn
   ```
3. Create the `.env` file
   ```sh
   cp .env.example .env
   ```
4. Enter the environmental variables in `.env`
5. Spin up the local testing database
   ```sh
   docker-compose up -d
   ```
6. Run the App
   ```sh
   yarn dev
   ```

## Inspecting the database

To inspect the database you can use adminer which is shipped in the docker-compose file.

1. Make sure you created the `.env` file
2. Run the docker-compose file
   ```sh
   docker-compose up -d
   ```
3. Open adminer in the browser:
   http://localhost:8080/?pgsql=postgis&username=postgres&db=starter&ns=public
4. Enter the database password and inspect the database

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## GitHub Actions

With GitHub Actions, we automatically build Docker images and push them to the GitHub package registry.

Docker images will be built on:

- Pull Requests to `main`
- Pushes to `main`
- Releasing new versions under a `v*.*.*` tag

## Storybook

To check out the UI Components in our Storybook run

```
yarn storybook
```

<!-- CONTACT -->

## Contact

re:edu GmbH - [@reedu_de](https://twitter.com/reedu_de) - kontakt@reedu.de

Project Link: [https://github.com/reedu-reengineering-education/next-map-starter](https://github.com/reedu-reengineering-education/next-map-starter)
