"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-safe").config();
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var compression_1 = __importDefault(require("compression"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var passport_1 = __importDefault(require("passport"));
var app = express_1.default();
var i18n_1 = __importDefault(require("i18n"));
var mongo_1 = __importDefault(require("./config/mongo"));
var path_1 = __importDefault(require("path"));
// Setup express server port from ENV, default: 3000
app.set("port", process.env.PORT || 3000);
// Enable only in development HTTP request logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan_1.default("dev"));
}
// Redis cache enabled by env variable
if (process.env.USE_REDIS === "true") {
  var getExpeditiousCache = require("express-expeditious");
  var cache = getExpeditiousCache({
    namespace: "expresscache",
    defaultTtl: "1 minute",
    engine: require("expeditious-engine-redis")({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    }),
  });
  app.use(cache);
}
// for parsing json
app.use(
  body_parser_1.default.json({
    limit: "20mb",
  })
);
// for parsing application/x-www-form-urlencoded
app.use(
  body_parser_1.default.urlencoded({
    limit: "20mb",
    extended: true,
  })
);
// i18n
i18n_1.default.configure({
  locales: ["en", "es"],
  directory: __dirname + "/locales",
  defaultLocale: "en",
  objectNotation: true,
});
app.use(i18n_1.default.init);
// Init all other stuff
app.use(cors_1.default());
app.use(passport_1.default.initialize());
app.use(compression_1.default());
app.use(helmet_1.default());
app.use(express_1.default.static("public"));
app.set("views", path_1.default.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(require("./app/routes"));
app.listen(app.get("port"));
// Init MongoDB
mongo_1.default();
module.exports = app; // for testing
