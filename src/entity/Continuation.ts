import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Continuation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    continuation: string;
}
