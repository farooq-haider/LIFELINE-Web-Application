import { DataSource } from 'typeorm';
import Donor from '../modules/donor/donor.entity';
import config from './config';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    entities: [ Donor ]
});

export default AppDataSource;