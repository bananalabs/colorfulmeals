'use strict';

function ViewCtrl(RecipeService, $scope, $window) {

    this.recipes = []
    this.error = ""
    this.page = 0
    //this.showDetail = false
    var params = RecipeService.getRecipeParameters()
    var ingredients = params.ingredients;
    var options = params.options;


    this.getRecipes = function(index) {
        $scope.promise = RecipeService.getRecipes(ingredients, options, index)
        $scope.promise
            .then(function (data) {
                if (data.data.matches.length === 0) {
                    console.log('no matches')
                    if ($scope.view.recipes.length == 0) {
                        $scope.view.error = "Sorry, there are no recipes with these ingredients. Try again."
                    }
                } else {
                    $scope.view.error = ""
                    $scope.view.recipes = $scope.view.recipes.concat(data.data.matches)
                }
            }, function (err) {
                console.log(err)
                if ($scope.view.recipes.length == 0) {
                    $scope.view.error = "Sorry, there are no recipes with these ingredients. Try again."
                }
            });
    }

    this.getRecipeName = function(name) {
        var n = name.substring(0, 17)
        if (name.length > 17) {
            n = n + "..."
        }
        return n
    }

    this.getRecipeSource = function(recipe) {
        $scope.promise = RecipeService.getRecipeSource(recipe.id)
        $scope.promise
            .then(function (data) {
                recipe.detailUrl = data.data.source.sourceRecipeUrl
            }, function (err) {
                $scope.view.error = "Sorry, there are no recipes with these ingredients. Try again."
            });
    }

    this.loadMore = function() {
        this.page = this.page + 1;
        //Load more recipes when user scrolls down the page
        this.getRecipes(this.page)
    }

    this.getRecipes(0)
}