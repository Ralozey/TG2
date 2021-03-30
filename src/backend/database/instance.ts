
import {Sequelize} from "sequelize";

export default new Sequelize(process.env.DB as string, {logging: false});