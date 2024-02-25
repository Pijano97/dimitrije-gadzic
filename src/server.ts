import express, { Request, Response } from 'express';
import { initializeApp } from "./db-schema";
import { ContinuationService } from "./service/continuation-service";
import axios from "axios";
import { ActivityService } from "./service/activity-service";

const app = express();
app.use(express.json());

const activityService = ActivityService.getInstance();

async function startServer() {
    try {
        await initializeApp();

        await activityService.pollEvents();

    } catch (e) {
        console.error('Error initializing the application:', e);
        process.exit(1); // Exit the process with an error code
    }
}

startServer();
