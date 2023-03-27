import db from "../../config/db";

export default {
    Query: {
        tasks: async () => {
            try {
                const tasks = await db.models.Task.findOne();

                if (!tasks) {
                    throw new Error('No tasks found');
                }
                console.log(tasks);
                return tasks;
            } catch (error) {
                return error;
            }
        },
    },
};
