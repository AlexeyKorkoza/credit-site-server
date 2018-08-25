module.exports = {
    up: queryInterface => queryInterface.renameColumn('clients', 'is_blocked', 'is_removed'),

    down: queryInterface => queryInterface.renameColumn('clients', 'is_removed', 'is_blocked'),
};
