
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1,
                              user_name: 'test',
                              user_email: 'testEmail@test.com',
                              user_avatar: 'http://www.free-avatars.com/data/media/47/Ken.gif',
                              password_digest: '1234'  })
                
      ]);
    });
};
