import { AppDataSource } from "./data-source";

export async function initializeApp(): Promise<void> {
    try {
        // Initialize the data source (create database and schemas)
        await AppDataSource.initialize();
        console.log('Data source initialized successfully');
    } catch (e) {
        console.error('Error initializing data source:', e);
        throw e; // Rethrow the error to handle it in the server
    }
}
