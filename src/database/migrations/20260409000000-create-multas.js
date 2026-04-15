'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('multas', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            emprestimo_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'emprestimos', key: 'id' },
                onDelete: 'CASCADE',
            },
            valor: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            pago: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('multas');
    },
};
