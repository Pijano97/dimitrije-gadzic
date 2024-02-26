// continuation.service.ts

import { Repository } from 'typeorm';
import { AppDataSource } from "../data-source";
import { Activity } from "../entity/Activity";
import axios from "axios";
import { Continuation } from "../entity/Continuation";
import { ContinuationService } from "./continuation-service";

// Add type if it exists
interface Events {
    [key: string]: any;
}

export class ActivityService {
    private static instance: ActivityService;
    private activityRepository: Repository<Activity>;
    private continuationService: ContinuationService;

    private POLL_INTERVAL = 5000;
    private POLL_ENDPOINT = 'https://api.reservoir.tools/events/asks/v3';

    private constructor() {
        this.activityRepository = AppDataSource.getRepository(Activity);
        this.continuationService = ContinuationService.getInstance();
    }

    public static getInstance(): ActivityService {
        if (!ActivityService.instance) {
            ActivityService.instance = new ActivityService();
        }
        return ActivityService.instance;
    }

    async saveMany(activities: Activity[]): Promise<Activity[]> {
        try {
            return await this.activityRepository.save(activities);
        } catch (e) {
            console.error('Error saving activities:', e);
            throw e;
        }
    }

    async pollEvents(): Promise<any> {
        const data = await this.fetchEvents();

        await this.continuationService.save({ continuation: data.continuation} );

        const events: Events[] = data.events
            .filter((event: any) => event.event.kind === 'new-order');

        const activities = this.mapActivities(events);
        await this.saveMany(activities);

        setInterval(fetch, this.POLL_INTERVAL)
    }


    private async fetchEvents(): Promise<Events> {
        let endpoint = this.POLL_ENDPOINT;
        const continuation = await this.continuationService.getLastWritten();
        if (continuation) {
            endpoint = `${this.POLL_ENDPOINT}?${continuation}`
        }

        const response = await axios.get(endpoint);
        return response.data
    }


    private mapActivities(events: Events[]): any {
        return events.map(event => ({
            contract_address: event.order.contract,
            token_index: event.order.criteria.data.token.tokenId,
            listing_price: event.order.price.amount.native,
            maker: event.order.maker,
            listing_from: event.order.validFrom,
            listing_to: event.order.validUntil,
            event_timestamp: event.event.createdAt

        }));
    }

}
