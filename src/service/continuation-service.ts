// continuation.service.ts

import { Repository } from 'typeorm';
import { Continuation } from "../entity/Continuation";
import { AppDataSource } from "../data-source";

export class ContinuationService {
    private static instance: ContinuationService;
    private continuationRepository: Repository<Continuation>;

    private constructor() {
        this.continuationRepository = AppDataSource.getRepository(Continuation);
    }

    public static getInstance(): ContinuationService {
        if (!ContinuationService.instance) {
            ContinuationService.instance = new ContinuationService();
        }
        return ContinuationService.instance;
    }

    async getLastWritten(): Promise<Continuation | null> {
        try {
            return await this.continuationRepository.findOne({
                order: {
                    id: 'DESC'
                },
                where: {}
            });
        } catch (e) {
            console.error('Error fetching last written continuation:', e);
            throw e;
        }
    }



    async save(continuation: Partial<Continuation>): Promise<void> {
        try {
            await this.continuationRepository.save(continuation);
        } catch (e) {
            console.error('Error saving continuation:', e);
            throw e;
        }
    }
}
