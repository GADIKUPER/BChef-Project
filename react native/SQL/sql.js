import RecipeCreatePage from "../Components/RecipeCreatePage";

const URL = "http://proj5.ruppin-tech.co.il";
// const URL = "http://localhost:54929"

export default class sql {

    static async UploadImage(image) {
        try {
            let res = await fetch(`${URL}/api/Img/UploadImage`, {
                method: 'POST',
                body: JSON.stringify(image),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            let data = await res.json();
            console.log("data Upload Image=>", data);
            if (data.isOk == true) {
                // console.log(data);
                return data.path
            }
        }
        catch (error) {
            console.log("err=>", error);
        }
    }

    static async UploadImageRecipe(image) {
        try {
            let res = await fetch(`${URL}/api/Img/UploadImage`, {
                method: 'POST',
                body: JSON.stringify(image),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            let data = await res.json();
            console.log("data Upload Image=>", data);
            if (data.isOk == true) {
                // console.log(data);
                return data.path
            }
        }
        catch (error) {
            console.log("err=>", error);
        }
    }


    static GetAllRecipes() {

        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${URL}/GetAllRecipes`, {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json"
                    }
                })
                const data = await res.json();
                resolve(data)
            }
            catch (error) {
                reject(error)
            }
        })
    }//END GetAllRecipes

    static GetAllUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${URL}/Get`, {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json"
                    }
                })
                const data = await res.json();
                resolve(data)
            }
            catch (error) {
                reject(error)
            }
        })
    }//END GetAllRecipes

    static async GetUserById(id) {

        try {
            const res = await fetch(`${URL}/GetUserById?id=${id}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                }
            })
            const data = await res.json();
            //console.log("data=>>>>>> :)",data);
            return data;
        }
        catch (error) {
            console.log("err=>", error);
        }

    }//END GetUserById

    static async GetRecipeById(ID) {
        //console.log('userId=', ID);

        try {
            const res = await fetch(`${URL}/RecipeById?id=${ID}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            })
            const data = await res.json();
            console.log(data);
            return data;
        }
        catch (error) {
            console.log("err=>", error);
        }
    }//END GetRecipeById

    static GetRecipesByUser(id) {
        console.log('Fetch userId=', id);
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${URL}/RecipeByUser?user_id=${id}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                })
                const data = await res.json();
                resolve(data);
            }
            catch (error) {
                reject(error);
            }
        })
    }//END GetRecipesByUser

    static async SearchRecipe(recipe) {
        try {
            //console.log('recipe', recipe);
            let recipeToSend = {
                Preparation_Name: recipe.preparation,
                Spices: [],
                Ingredients: [],
            }

            for (let i = 0; i < recipe.ingredients.length; i++) {
                recipeToSend.Ingredients.push({ Ingredients_Name: recipe.ingredients[i] });
            }

            for (let i = 0; i < recipe.spices.length; i++) {
                recipeToSend.Spices.push({ Spices_Name: recipe.spices[i] });
            }

            console.log(`recipeToSend`, recipeToSend)

            const res = await fetch(`${URL}/SearchRecipe`, {
                method: "POST",
                body: JSON.stringify(recipeToSend),
                headers: {
                    'Accept': 'application/json',
                    "content-type": "application/json"
                },

            });
            const data = await res.json();

            return data

        }
        catch (error) {
            console.log("err=>", error);
        }


    }//END SearchRecipe

    static Register(FirstName, LastName, Email, Password, PictureUri, Gender) {
        console.log("PictureUri=>", PictureUri);
        
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${URL}/Register`, {
                    method: "POST",

                    body: JSON.stringify({
                        FirstName,
                        LastName,
                        Email,
                        Password,
                        PictureUri,
                        Gender
                    }),
                    headers: {
                        'Accept': 'application/json',
                        "content-type": "application/json"
                    }
                });
                const data = await res.json();
                resolve(data);
            }
            catch (error) {
                reject(error);
            }
        })

    } // END Register 

    static Login(Email, Password) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await fetch(`${URL}/Login`, {
                    method: "POST",
                    body: JSON.stringify({
                        Email,
                        Password
                    }),
                    headers: {
                        'Accept': 'application/json',
                        "content-type": "application/json"
                    }
                });
                let data = await res.json();
                resolve(data);
            }
            catch (error) {
                reject(error);
            }
        })
    } // END Login 


    static async InsertSpicesToTBSpices(Spices_Name) {



        try {

            const res = await fetch(`${URL}/InsertSpicesToTBSpices/`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    Spices_Name
                })
            });
            const data = await res.json();
            // resolve(data);
            console.log(data);
        }
        catch (error) {
            // reject(error);
            console.log(error);
        }


    }//END InsertSpicesToTBSpices

    static async InsertIngredientsToTBIngredients(Ingredients_Name) {


        try {

            const res = await fetch(`${URL}/InsertIngredientsToTBIngredients/`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    Ingredients_Name
                })
            });
            const data = await res.json();
            //console.log(data);
        }
        catch (error) {
            console.log("err=>", error);
        }


    }//END InsertIngredientsToTBIngredients

    static async InsertPreparationToTBPreparation(Preparation_Name) {


        try {

            const res = await fetch(`${URL}/InsertPreparationToTBPreparation/`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    Preparation_Name
                })
            });
            const data = await res.json();
            //console.log(data);
        }
        catch (error) {
            console.log("err=>", error);
        }


    }//END InsertPreparationToTBPreparation

    static async InsertPictureToTBRecipePicture(Recipe_Id, PictureUri, PictureName) {

        return new Promise(async (resolve, reject) => {
            try {

                const res = await fetch(`${URL}/InsertRecipe`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        Recipe_Id,
                        PictureUri,
                        PictureName
                    })
                });
                const data = await res.json();
                resolve(data);
            }
            catch (error) {
                reject(error);
            }
        })

    }//END InsertPictureToTBRecipePicture

    static async InsertRecipe(recipe, Spices, Ingredients, Prepatations) {
        console.log("recipe helooooo0 =>",recipe);
        try {
            //console.log('recipe', recipe);
            let recipeToSend = {
                UserID: recipe.UserID,
                RecipeName: recipe.RecipeName,
                Preparation_Code: 0,
                Preparation_Name: recipe.preparation,
                Note: recipe.Note,
                Spices: [],
                Ingredients: [],
                RecipePictureUri: recipe.RecipePictureUri
                
            }
            console.log("recipeToSend=>",recipe.Pics);

            for (let i = 0; i < Prepatations.length; i++) {
                if (recipe.preparation == Prepatations[i].Preparation_Name) {
                    recipeToSend.Preparation_Code = Prepatations[i].Preparation_Code;
                    break;
                }
            }

            for (let i = 0; i < recipe.ingredients.length; i++) {
                for (let j = 0; j < Ingredients.length; j++) {
                    if (recipe.ingredients[i] == Ingredients[j].Ingredients_Name) {
                        recipeToSend.Ingredients.push(Ingredients[j]);
                        break;
                    }
                }
            }

            for (let i = 0; i < recipe.spices.length; i++) {
                for (let j = 0; j < Spices.length; j++) {
                    if (recipe.spices[i] == Spices[j].Spices_Name) {
                        recipeToSend.Spices.push(Spices[j]);
                        break;
                    }
                }
            }

           

            console.log(`recipeToSend`, recipeToSend)

            const res = await fetch(`${URL}/InsertRecipe`, {
                method: "POST",
                body: JSON.stringify(recipeToSend),
                headers: {
                    'Accept': 'application/json',
                    "content-type": "application/json"
                },

            });
            const data = await res.json();
            console.log(data);
            return data
        }
        catch (error) {
            console.log("err=>", error);
        }


    }//END InsertRecipe

    static async UpdateSpicesInTBSpicesn(Spices_Code, Spices_Name) {


        try {

            const res = await fetch(`${URL}/UpdateSpicesInTBSpicesn`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    Spices_Code,
                    Spices_Name
                })
            });
            const data = await res.json();
            console.log(data);
        }
        catch (error) {
            console.log("err=>", error);
        }

    }//END UpdateSpicesInTBSpicesn

    static async UpdateIngredientsInTBIngredients(Ingredients_Code, Ingredients_Name) {


        try {

            const res = await fetch(`${URL}/UpdateIngredientsInTBIngredients`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    Ingredients_Code,
                    Ingredients_Name
                })
            });
            const data = await res.json();

            console.log(data);
        }
        catch (error) {
            console.log("err=>", error);
        }

    }//END UpdateIngredientsInTBIngredients

    static async UpdatePreparationInTBPreparation(Preparation_Code, Preparation_Name) {


        try {

            const res = await fetch(`${URL}/UpdatePreparationInTBPreparation`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    Preparation_Code,
                    Preparation_Name
                })
            });
            const data = await res.json();

            console.log(data);
        }
        catch (error) {
            console.log("err=>", error);
        }

    }//END UpdatePreparationInTBPreparation

    // static async UpdatePictureInTBRecipePicture(Recipe_Id,PictureUri,PictureName) {

    //     return new Promise(async (resolve, reject) => {
    //         try {

    //             const res = await fetch(`${URL}/UpdatePictureInTBRecipePicture`, {
    //                 method: "PUT",
    //                 headers: {
    //                     "content-type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     Recipe_Id,
    //                     PictureUri,
    //                     PictureName
    //                 })
    //             });
    //             const data = await res.json();

    //             resolve(data);
    //         }
    //         catch (error) {
    //             reject(error);
    //         }
    //     })
    // }//END UpdatePictureInTBRecipePicture

    static async UpdateTBUserRecipes(recipes, Spices, Ingredients, Prepatations) {
        try {
            //console.log('recipe', recipe);
            let recipeToSend = {
                Recipe_Id: recipes.Recipe_Id,
                RecipeName: recipes.RecipeName,
                Preparation_Code: 0,
                Preparation_Name: recipes.preparation,
                Note: recipes.Note,
                Spices: [],
                Ingredients: [],
                Pics: recipes.RecipePictureUri
            }

            for (let i = 0; i < Prepatations.length; i++) {
                if (recipes.preparation == Prepatations[i].Preparation_Name) {
                    recipeToSend.Preparation_Code = Prepatations[i].Preparation_Code;
                    break;
                }
            }
    
            for (let i = 0; i < recipes.ingredients.length; i++) {
                for (let j = 0; j < Ingredients.length; j++) {
                    if (recipes.ingredients[i] == Ingredients[j].Ingredients_Name) {
                        recipeToSend.Ingredients.push(Ingredients[j]);
                        break;
                    }
                }
            }

            for (let i = 0; i < recipes.spices.length; i++) {
                for (let j = 0; j < Spices.length; j++) {
                    if (recipes.spices[i] == Spices[j].Spices_Name) {
                        recipeToSend.Spices.push(Spices[j]);
                        break;
                    }
                }
            }

            console.log(`recipeToSend`, recipeToSend)

            const res = await fetch(`${URL}/UpdateTBUserRecipes`, {
                method: "PUT",
                body: JSON.stringify(recipeToSend),
                headers: {
                    'Accept': 'application/json',
                    "content-type": "application/json"
                },

            });
            const data = await res.json();

            console.log(data);
            return data

        }
        catch (error) {
            console.log("err=>", error);
        }


    }//END UpdateTBUserRecipes

    static async DeletSpicesFromTBSpices(Spices_Code) {
        try {
            const res = await fetch(`${URL}/DeletSpicesFromTBSpices`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    Spices_Code
                })
            });
            const data = await res.json();
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }


    }//END DeletSpicesFromTBSpices

    static async DeletIngredientsFromTBIngredients(Ingredients_Code) {


        try {

            const res = await fetch(`${URL}/DeletIngredientsFromTBIngredients`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    Ingredients_Code
                })
            });
            const data = await res.json();

            console.log(data);
        }
        catch (error) {
            console.log("err=>", error);
        }


    }//END DeletIngredientsFromTBIngredients

    static async DeletPreparationFromTBPreparation(Preparation_Code) {


        try {

            const res = await fetch(`${URL}/DeletPreparationFromTBPreparation`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    Preparation_Code
                })
            });
            const data = await res.json();
            console.log(data);
        }
        catch (error) {
            console.log("err=>", error);
        }


    }//END DeletPreparationFromTBPreparation

    // static async DeletPictureFromTBRecipePicture(Recipe_Id, PictureUri, PictureName) {

    //     return new Promise(async (resolve, reject) => {
    //         try {

    //             const res = await fetch(`${URL}/DeletPictureFromTBRecipePicture`, {
    //                 method: "DELETE",
    //                 headers: {
    //                     "content-type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     Recipe_Id,
    //                     PictureUri,
    //                     PictureName
    //                 })
    //             });
    //             const data = await res.json();
    //             resolve(data);
    //         }
    //         catch (error) {
    //             reject(error);
    //         }
    //     })

    // }//END DeletPictureFromTBRecipePicture

    static DeleteRecipe(Recipe_Id) {

        return new Promise(async (resolve, reject) => {
            try {

                const res = await fetch(`${URL}/DeleteRecipe`, {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        Recipe_Id
                    })
                });
                const data = await res.json();
                resolve(data);
            }
            catch (error) {
                reject(error);
            }
        })

    }//END DeleteRecipe

    static GetTbSpices() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${URL}/GetAllSpices`, {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json"
                    }
                })
                const data = await res.json();
                resolve(data)
            }
            catch (error) {
                reject(error)
            }
        })
    }//END GetTbSpices

    static GetTBIngredients() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${URL}/GetTBIngredients`, {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json"
                    }
                })
                const data = await res.json();
                resolve(data)
            }
            catch (error) {
                reject(error)
            }
        })
    }//END GetTBIngredients

    static GetTBPreparation() {


        return new Promise(async (resolve, reject) => {

            try {
                const res = await fetch(`${URL}/GetTBPreparation`, {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json"
                    }
                })
                const data = await res.json();
                resolve(data)
            }
            catch (error) {
                reject(errro)
            }
        })
    }//END GetTBPreparation


    static PutEditProfile(ID, FirstName, LastName, PictureUri) {
        console.log("ID=>",ID);

        console.log("FirstName=>",FirstName);
        console.log("LastName=>",LastName);
        console.log("PictureUri=>",PictureUri);

        return new Promise(async (resolve, reject) => {

            try {

                const res = await fetch(`${URL}/EditProfile`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        ID,
                        FirstName,
                        LastName,
                        PictureUri
                    })
                });
                const data = await res.json();

                resolve(data)
            }
            catch (error) {
                reject("err=>", error)
            }
        })

    }//END EditProfile

}

