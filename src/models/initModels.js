const { User } = require('./user.model');
const { Restaurant } = require('./restaurant.model');
const { Meal } = require('./meal.model');
const { Order } = require('./order.model');
const { Review } = require('./review.model');

const initModels = () => {
  // 1 Restaurant <----> M Meal
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  //1 Restaurant <---> M Reviews
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  // 1 User <-----> M Reviews
  User.hasMany(Review);
  Review.belongsTo(User);
};

module.exports = { initModels };
