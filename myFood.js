Foods = new Mongo.Collection("foods");

if (Meteor.isClient) {

  Template.body.helpers({
    //returns foods available
    foods: function () {
      return Foods.find({Session.get(foodCategory): {$in: [true]}});
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

    "click .fruit": function () {
      Meteor.call("foodCategoryToggleToSessionStore", "fruit");
    },
    "click .starch": function () {
      Meteor.call("foodCategoryToggleToSessionStore", "starch");
    },
    "click .beans": function () {
      Meteor.call("foodCategoryToggleToSessionStore", "beans");
    },
    "click .greens": function () {
      Meteor.call("foodCategoryToggleToSessionStore", "greens");
    }
  });
}

Meteor.methods({
  //food category check box state stored to session
  foodCategoryToggleToSessionStore: function (category) {
    Session.setDefault(category, false);
    Session.set(category, !Session.get(category));
    console.log(Session.get(category));
    console.log(Session);
  }

});







if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
