
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
        users.increments();
        
        users.string('name', 255).unique();
        users.string('sectionId', 255).notNullable();
    })
  
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };