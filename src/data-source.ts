import { DataSource } from "typeorm"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Activity } from "./entity/Activity";
import { Tokens } from "./entity/Tokens";
import { Continuation } from "./entity/Continuation";

export const DB_CONFIG: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'password',
    entities: [Activity, Tokens, Continuation],
    synchronize: true,
};
export const AppDataSource = new DataSource(DB_CONFIG);
