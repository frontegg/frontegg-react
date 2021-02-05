## Contributing to Frontegg Redux Store

### Contribution Prerequisites

- You have Node installed at v13.0.0+ and Yarn at v1.2.0+.
- You are familiar with Git.

### Guidlines

- Move all exports to the bottom of each file
- Main index.ts should export default state as ReducerName and all it's inline exports, for example:
  ```typescript
  export {default as auth} from './auth';
  export * from './auth';
  ```
- For each state must add Matcher to check if DispatchAction types aligned with the reducers and actions
- Create DispatchedActions type for each state
- If you want to add new library, add it as external in rollup.config.js
