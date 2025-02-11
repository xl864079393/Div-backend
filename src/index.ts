import { app } from '@/routes/app'
import http from 'http'
import os from 'os'

const PORT = parseInt(process.env.PORT || '8080', 10);

async function startServer() {
    // perform any start up here
    const networkInterfaces = os.networkInterfaces();
    for (let name of Object.keys(networkInterfaces)) {
        const interfaces = networkInterfaces[name];
        if (interfaces) {
            for (let net of interfaces) {
                if (net.family === 'IPv4' && !net.internal) {
                    console.log(`Server IP Address on network: http://${net.address}:${PORT}`, __filename);
                }
            }
        }
    }
    const server = http.createServer(app)
    server.listen(PORT, '0.0.0.0', () => {
        console.log('server started', __filename)
    });
}

startServer()