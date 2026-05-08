# Wordle Clone (React + Redux + Node.js)

A recreation of the popular Wordle game built with a full-stack JavaScript setup using React, Redux, and Node.js.

---

## Overview

This project is a Wordle-style word guessing game where the player has to guess a hidden 5-letter word within a limited number of attempts. After each guess, feedback is provided to indicate correct letters and positions.

It demonstrates:

- React component-based UI
- Redux state management
- Node.js backend API (Redis for word of the day caching)
- Separation of frontend and backend logic
- Game state handling and validation

---

## Tech Stack

### Frontend

- React
- Redux Toolkit
- React-Redux
- CSS / SCSS

### Backend

- Node.js
- Express.js
- Redis

### Tools

- pnpm

---

## Features

- Daily word generation
- 6 attempts per game
- Letter feedback system:
  - Correct letter & correct position (green)
  - Correct letter but wrong position (yellow)
  - Incorrect letter (gray)
- Keyboard input support (physical and/or on-screen)
- Redux-managed game state
- Restart
- Backend-driven word selection
