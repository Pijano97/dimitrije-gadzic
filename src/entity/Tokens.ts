import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tokens {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    index: number;

    @Column()
    contract_address: string;

    @Column()
    current_price: number;
}
