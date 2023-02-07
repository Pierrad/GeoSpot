# GeoSpot

GeoSpot is a PWA (progressive web app) that allows users to discover and share their favorite places. Users can create an account, add a new place, and find places that other users have added.

## Technologies Used

<img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="ReactJS" /><img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="Typescript" />


This app uses the following technologies:
- [React](https://reactjs.org/) -> Base library
- [Vite](https://vitejs.dev/) -> Build tool
- [TypeScript](https://www.typescriptlang.org/) -> Language
- [Material UI](https://mui.com/) -> UI library
- [React Router](https://reactrouter.com/en/main) -> Routing
- [React Query](https://react-query-v3.tanstack.com/) -> Data fetching, caching, and state management
- [ESLint](https://eslint.org/) -> Linter
- [Prettier](https://prettier.io/) -> Code formatter

For the features, it uses:
- [ThreeJS](https://threejs.org/) -> Render 3D scene with objects
- [MapBox](https://www.mapbox.com/) -> Render map with markers and routes
- DeviceOrientation and Geolocation

## Getting Started

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/Pierrad/GeoSpot.git
cd geospot
cp .env.example .env # fill variables
npm install
```

Then, start the app:

```bash
npm run dev
```

## Deployment

To deploy the app, run the following command:

```bash
npm run build
npm run preview
```

## Notes

The backend code is available [here](https://github.com/Pierrad/GeoSpot_API).
