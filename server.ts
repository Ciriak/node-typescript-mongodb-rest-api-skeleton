// tslint:disable-next-line: no-var-requires
require('dotenv-safe').config();
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
const app = express();
import i18n from 'i18n';
import initMongo from './config/mongo';
import path from 'path';
import routes from './app/routes';
import { renderFile } from 'ejs';
import expeditiousCache from 'express-expeditious';

// Setup express server port from ENV, default: 3000
app.set('port', process.env.PORT || 3000);

// Enable only in development HTTP request logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Redis cache enabled by env variable
if (process.env.USE_REDIS === 'true') {
  const cache = expeditiousCache({
    namespace: 'expresscache',
    defaultTtl: '1 minute',
    engine: require('expeditious-engine-redis')({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
      }
    })
  });
  app.use(cache);
}

// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
);
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
);

// i18n
i18n.configure({
  locales: ['en', 'es'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
  objectNotation: true
});
app.use(i18n.init);

// Init all other stuff
app.use(cors());
app.use(passport.initialize());
app.use(compression());
app.use(helmet());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', renderFile);
app.set('view engine', 'html');
app.use(routes);
app.listen(app.get('port'));

// Init MongoDB
initMongo();

export default app; // for testing
