var servicesModule = angular.module('MyFoodApp.services.recipes', []);

servicesModule.service('RecipeService', function($http) {

    var recipe_params = {}
    var app_id = "737c09e2"
    var app_key = "fcfc728e5578f36da5dacc95bb724cb1"

    this.getRecipeParameters = function() {
        return recipe_params
    }

    this.setRecipeParameters = function(ingredients, options) {
        recipe_params.ingredients = ingredients
        recipe_params.options = options
    }

    this.getRecipes = function(ingredients, options, index) {
        var q = ""
        for (var key in ingredients) {
            q = q + ingredients[key] + "+"
        }
        if (options) {
            if (options.lowcarb === true) {
                q = q + "&nutrition.CHOCDF.min=0&nutrition.CHOCDF.max=10"
            }
            if (options.lowfat === true) {
                q = q + "&nutrition.FAT.min=0&nutrition.FAT.max=3"
            }
            if (options.dairyfree === true) {
                q = q + "&allowedAllergy[]=396^Dairy-Free"
            }
            if (options.glutenfree === true) {
                q = q + "&allowedAllergy[]=393^Gluten-Free"
            }
        }
        var url = "http://api.yummly.com/v1/api/recipes?_app_id="
            +app_id+"&_app_key="+app_key+"&q="+q
            +"&callback=JSON_CALLBACK&maxResult=50&start="+index+"&requirePictures=true"
        return $http.jsonp(url);
    }

    this.getRecipeSource = function(id) {
        var url = "http://api.yummly.com/v1/api/recipe/"+id+"?_app_id="
            +app_id+"&_app_key="+app_key+"&callback=JSON_CALLBACK"
        return $http.jsonp(url);
    }

})
