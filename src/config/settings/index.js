import { development, staging } from "./env";

export default (() => {
  switch (process.env.REACT_APP_ENV) {
    case "dev":
    case "dev ":
    case "development":
      return development;

    case "stag":
    case "stag ":
    case "staging":
      return staging;

    default:
      return development;
  }
})();
