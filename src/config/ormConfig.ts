import { DataSource } from "typeorm";
import Donor from "../modules/donor/donor.entity";
import DonationHistory from "../modules/donationHistory/donationHistory.entity";
import Recipient from "../modules/recipient/recipient.entity";
import config from "./config";
import Feedback from "../modules/feedback/feedback.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  entities: [Donor, DonationHistory, Recipient, Feedback],
});

export default AppDataSource;
