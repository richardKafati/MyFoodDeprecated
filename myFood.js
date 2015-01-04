Foods = new Mongo.Collection("Foods");

if (Meteor.isClient) {
  //Food categories checked stored in session array
Session.setDefault("foodCategoriesChecked", []);

Template.body.helpers({
  //returns foods available
  foods: function () {
    return Foods.find({
      foodCategory: { 
        $in: Session.get("foodCategoriesChecked")
        }
      });
  }
});

Template.body.events({
  //submits new food available
  "submit .new-food": function (event) {
    event.preventDefault();
    var foodCategory = event.target.foodCategory.value;
    var food = event.target.food.value;
    
    Foods.insert({
      foodCategory: foodCategory,
      food: food
      });
  },

  //removes food
  "click .delete": function () {
    Foods.remove(this._id);
  },

  //food category toggles to session array
  "click .filter": function (event) {
    var filter = event.target.value;
    var toggleToTrue = event.target.checked;
    
    // get the Array from the session via get
    var catArray = Session.get("foodCategoriesChecked");
    
    if (toggleToTrue) {
      console.log(toggleToTrue);
      console.log("Adding: " + filter);
      
      // push new filter to arrray
      catArray.push(filter);
      
      // uses underscore to manupulate the array http://underscorejs.org/#uniq
      catArray = _.uniq(catArray);
      
      console.log(catArray);
      
      // Put Array back into Session Variable for Update
      Session.set("foodCategoriesChecked", catArray);
      
    } else {
      console.log(toggleToTrue);
      console.log("Removing: " + filter);
      
      // uses underscore to delete tge filter the array http://underscorejs.org/#without
      catArray = _.without(catArray, filter)
      
      console.log(catArray);
      
      // Put Array back into Session Variable for Update
      Session.set("foodCategoriesChecked", catArray);
      
    }
    
  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
