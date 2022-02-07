# FencingApp

## Description

This is a cross-platform mobile app for a web platform focused on creating, managing, and participating in fencing tournaments. While the platform
will eventually branch out and include other sports and events, fencing is the primary focus for now. The key challenge that this project aims to address
is the difficulty in managing and participating in fencing tournaments. This project will allow users to synchronize bout scores and data to make it easier
for participants to know how they are doing in a given tournament and also to make it easier for referees to manage noting scores by automating this process.
Another key goal of this project is to make it easier for fencers to find upcoming tournaments and post tournaments of their own, whether publically or through
a private code.

## Tech Stack

This app is developed in Typescript using React Native, Firebase Authentication, and Apollo Client (for GraphQL).

## What's completed so far
1. The basic screens for user registration and login that interact with Firebase and the backend API
2. User authentication for all GraphQL queries and mutations
3. User login status is stored locally to keep the current user logged in
3. The panel setup for the logged-in user, containing space to browse tournaments, check the user's dashboard, and check their profile
4. Basic implementation of the dashboard including end-to-end queries for the backend

## Next Steps

1. Finish the tournament browsing screen and allow users to register for new tournaments
2. Allow users to create public and private tournaments
3. Allow users to request to manage upcoming tournaments and be manually added as managers by existing managers

## Key Challenges
2. Figuring out how to handle authentication for the GraphQL queries on the frontend took a while, but I eventually settled on a design that works well

## What I would do differently
Nothing yet, I feel very good about the general design of this project so far.
