require('dotenv').config(({ path: 'pkg.env.dev' }));

const svr = require('./server');
const api = require('./apiClient');



setInterval(function() {
    try { 
        api.doCallAPIKORAirportParkingTraffic();
        api.doCallAPIICNAirportParkingTraffic();
        api.doCallAPIKORAirportInsideTraffic();
    } catch (err) {
        log.error('메인 스레드 예외 발생');
    }
}, 10000);