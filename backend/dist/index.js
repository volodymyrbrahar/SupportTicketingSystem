"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Root endpoint welcome message
app.get('/', (req, res) => {
    res.json({
        message: 'Support Ticket System Backend API is active',
        frontendUrl: 'http://localhost:3000',
        endpoints: {
            tickets: 'http://localhost:4000/tickets',
            health: 'http://localhost:4000/health',
        },
    });
});
// Healthcheck
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Routes
app.use('/tickets', ticketRoutes_1.default);
// Error middleware
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`Support Ticket System Backend listening on port ${port}`);
});
