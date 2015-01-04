Foods = new Mongo.Collection("Foods");

if (Meteor.isClient) {
  //Food categories checked stored in session array
  Session.setDefault("foodCategoriesChecked", []);

  Template.body.helpers({
    //returns foods available
    foods: function () {
      return Foods.find({});
    }
  });

  Template.body.events({
    //submits new food available
    "submit .new-food": function (event) {
      Foods.insert({foodCategory: event.target.foodCategory.value, food: event.target.food.value});
      event.target.food.value = "";
      event.target.foodCategory.value = "";
      return false;
    },

    //removes food
    "click .delete": function () {
      Foods.remove(this._id);
    },

    //food category toggles to session array
    "click .fruit": function () {
      Meteor.call("foodCategoriesCheckedToggleToSession", "fruit");
    },
    "click .starch": function () {
      Meteor.call("foodCategoriesCheckedToggleToSession", "starch");
    },
    "click .beans": function () {
      Meteor.call("foodCategoriesCheckedToggleToSession", "beans");
    },
    "click .greens": function () {
      Meteor.call("foodCategoriesCheckedToggleToSession", "greens");
    }
  });
}

Meteor.methods({
  //checks weather food category is in session array, then either adds or removes it
  foodCategoriesCheckedToggleToSession: function(foodCategory) {
    foodCategoriesChecked = Session.get("foodCategoriesChecked")
    indexOfFoodCategory = foodCategoriesChecked.indexOf(foodCategory);
    if (indexOfFoodCategory != -1)
      foodCategoriesChecked.splice(indexOfFoodCategory, 1)
    else
      foodCategoriesChecked.push(foodCategory);
    console.log(foodCategoriesChecked);
  }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
