const express = require('express');
const app = express();
const PORT = 4040

app.listen(PORT, function(){
    console.log("> ME-Note Backend API");
    console.log(`> Listening on http://localhost:${PORT}`);
});

// Route imports
require('./AppRoutes/RouteBase')(app);