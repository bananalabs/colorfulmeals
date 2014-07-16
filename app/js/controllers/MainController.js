'use strict';

function MainCtrl(RecipeService, $location) {

    this.error = ""
    this.options

    this.submit = function() {
        if (!this.ingredients) {
            this.error = "Please pick an ingredient from at least one food group"
        } else {
            this.error = ""
            RecipeService.setRecipeParameters(this.ingredients, this.options)
            $location.path('/view')
        }
    }
}