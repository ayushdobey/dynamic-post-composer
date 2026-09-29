# Full Stack Development – 2 Practical File

## Experiment 1

**Name:** ____________________  
**UID:** ____________________  
**Class:** ____________________  
**Subject:** Full Stack Development – 2

### Aim

To implement centralized application state management in a React application using Redux Toolkit.

### Objective

To configure a Redux store, create feature slices, dispatch actions, update state through reducers, and manage posts, platforms, and user-interface data in a structured normalized form.

### Software Requirements

Node.js (18+), npm, Visual Studio Code, React, Vite, Redux Toolkit, React Redux, and a modern web browser.

### Theory

Redux is a predictable state-management library in which application data is kept in one central store. Redux Toolkit simplifies Redux development by providing `configureStore`, `createSlice`, immutable update support through Immer, and useful defaults. A slice groups a state area with its reducers and generated actions. This project stores posts and platforms in normalized `{ ids, entities }` structures using `createEntityAdapter`, avoiding duplicate records and making updates scalable. The `ui` slice centrally stores the active platform filter and search text.

### Procedure

1. Create a Vite React project and install `@reduxjs/toolkit` and `react-redux`.
2. Configure the store in `src/app/store.js` with `posts`, `platforms`, and `ui` reducers.
3. Create Redux slices for each state domain.
4. Use entity adapters to normalize posts and platforms.
5. Wrap the React root in the Redux `Provider`.
6. Use `useDispatch` to add, publish/draft, and delete posts; use `useSelector` to read state.
7. Run the application and demonstrate that every component reads the same centralized data.

### Outcome

A working content-planning dashboard manages post records, platform records, and filter state from a single Redux store.

### Result

Centralized state management was implemented successfully using Redux Toolkit. Store configuration, slices, actions, reducers, and normalized state are demonstrated in the application.

---

## Experiment 2

**Name:** ____________________  
**UID:** ____________________  
**Class:** ____________________  
**Subject:** Full Stack Development – 2

### Aim

To optimize access to centralized Redux state by using memoized selectors.

### Objective

To derive filtered post lists, platform-specific posts, published and draft counts, and dashboard statistics efficiently with `createSelector`.

### Software Requirements

Node.js (18+), npm, Visual Studio Code, React, Vite, Redux Toolkit, React Redux, and a modern web browser.

### Theory

Selectors read or derive values from the Redux store. Derived data should not normally be stored separately because it can become inconsistent with source data. `createSelector` creates a memoized selector: it remembers its previous inputs and result, recalculating only when an input reference changes. In this project, selectors derive the visible filtered posts, platform-specific lists, published and draft totals, and platform breakdown statistics. This reduces repeated filtering and helps React-Redux avoid unnecessary component updates when unrelated state, such as the UI-only counter, changes.

### Procedure

1. Create `src/features/posts/selectors.js`.
2. Define base selectors for posts, selected platform, and search term.
3. Create `selectFilteredPosts` with `createSelector` to filter posts by platform and title.
4. Create selectors for posts by platform, published count, draft count, and combined dashboard statistics.
5. Consume these selectors with `useSelector` in dashboard components.
6. Use the UI-only button and observe that its local counter changes without altering selector inputs.
7. Change a filter or post; observe that the memoized derived information updates accurately.

### Outcome

The dashboard presents efficient, consistent derived data from the Redux store, including filter results and live statistics.

### Result

Memoized selectors were implemented successfully using `createSelector`. The application avoids unnecessary recalculation of derived post data and demonstrates frontend state-access optimization.

---

## Installation and Run Instructions

1. Open this project folder in a terminal.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the local URL displayed by Vite (normally `http://localhost:5173`).
5. For a production verification build, run: `npm run build`

## Demonstration Checklist

- Add a draft and see it appear in the shared Redux-backed dashboard.
- Change a post between draft and published; watch both counters update.
- Search or choose a platform to demonstrate the filtered memoized selector.
- Use the UI-only counter: it changes local component state without changing selector inputs.
- Point out `posts: { ids, entities }` and `platforms: { ids, entities }` as the normalized central-state design.
