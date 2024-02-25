import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contract_address: string;

    @Column()
    token_index: string;

    @Column()
    listing_price: number;

    @Column()
    maker: string;

    @Column()
    listing_from: number;

    @Column()
    listing_to: number;

    @Column({ type: 'timestamp' })
    event_timestamp: Date;
}
