import express = require('express');
import { Routes } from './api/routes/apiRoutes';


// Our Express APP config
const app = express();
app.set('port', process.env.PORT || 3000);

 const apiRoutes: Routes = new Routes();

 apiRoutes.routes(app);

// // API Endpoints
// app.get('/', (req, res) => {
//   res.send('Address Api');
// });

// export our app
export default app;
