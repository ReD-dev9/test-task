import { QueryInterface, DataTypes } from 'sequelize';

export = {
    async up (queryInterface: QueryInterface) {
        return queryInterface.createTable('Task', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            desc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },

    async down (queryInterface: QueryInterface) {
        return queryInterface.dropTable('Task');
    },
};
