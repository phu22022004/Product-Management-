const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();
const systemConfig = require("./config/system");
const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");
const database = require("./config/database");
database.connect();
const app = express();

const port = process.env.PORT;
app.use(methodOverride("_method"));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

//Flash
app.use(cookieParser("phuIT"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//End flash

//App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
