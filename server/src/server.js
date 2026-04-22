import app from './app.js';
import connectDB from './db/db.js';
import config from './config/env.js';
import seedAdmin from './scripts/seedAdmin.js';

const startServer = async () => {
    await connectDB();
    await seedAdmin();

    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
};

startServer();
