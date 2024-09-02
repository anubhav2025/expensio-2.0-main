import connectRabbitMQ from "./rabbitmq.js";
import { logError, logInfo } from "@expensio/sharedlib";
import { subscribeToExpenseCreated } from "../events/subscribers/subscribeToExpenseCreated.js";
import { subscribeToExpensesDeleted } from "../events/subscribers/subscribeToExpensesDeleted.js";
import { subscribeToIncomeCreated } from "../events/subscribers/subscribeToIncomeCreated.js";
import { subscribeToIncomesDeleted } from "../events/subscribers/subscribeToIncomesDeleted.js";
import { subscribeToExpenseFinancialDataUpdated } from "../events/subscribers/subscribeToExpenseFinancialDataUpdated.js";
import { subscribeToIncomeFinancialDataUpdated } from "../events/subscribers/subscribeToIncomeFinancialDataUpdated.js";

let channel;

const startRabbitMQ = async () => {
	try {
		channel = await connectRabbitMQ();

		// Initialize event subscribers

		await subscribeToExpenseCreated(channel);
		await subscribeToExpensesDeleted(channel);
		await subscribeToIncomeCreated(channel);
		await subscribeToIncomesDeleted(channel);
		await subscribeToExpenseFinancialDataUpdated(channel);
		await subscribeToIncomeFinancialDataUpdated(channel);

		// can initialize more event subscribers here

		logInfo("RabbitMQ setup completed successfully.");
	} catch (error) {
		logError("Failed to start RabbitMQ services:", error);
		process.exit(1);
	}
};

export default startRabbitMQ;
