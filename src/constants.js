// // let DOMAIN = "https://popflix-backend.herokuapp.com"
// let DOMAIN = "http://localhost:5000";

// export { DOMAIN };
const env = "prod";

let DOMAIN = "http://localhost:5000";
if (env === "prod") {
  DOMAIN = "https://popflix-backend.herokuapp.com";
}

export { DOMAIN };
