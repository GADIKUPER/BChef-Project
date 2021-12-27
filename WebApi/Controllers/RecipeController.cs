using BChefApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BChefApi.Controllers
{

    public class RecipeController : ApiController
    {
        [HttpGet]
        [Route("GetAllRecipes")]
        public IHttpActionResult Get()
        {
            try
            {
                List<Recipe> recipe = DB.GetRecipes();
                if (recipe == null)
                    return Content(HttpStatusCode.NotFound, "recipes not found");
                return Ok(recipe);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    
        [HttpPost]
        [Route("SearchRecipe")]
        public IHttpActionResult SearchRecipe([FromBody] Recipe recipe)
        {
            try
            {
                List<Recipe> recipes = DB.GetRecipes();
                if (recipes == null)
                    return Content(HttpStatusCode.NotFound, "recipes not found");

                List<Recipe> resultsByPreparation = recipes.FindAll(r => r.Preparation_Name == recipe.Preparation_Name);

                if (resultsByPreparation.Count > 0)
                {
                    List<string> spices = new List<string>();
                    List<string> ingredients = new List<string>();

                    foreach (Ingredients ing in recipe.Ingredients)
                        ingredients.Add(ing.Ingredients_Name);

                    foreach (Spices spice in recipe.Spices)
                        spices.Add(spice.Spices_Name);

                    List<Recipe> resultsBySpices = resultsByPreparation.FindAll(r => r.Spices.Any(s => spices.Contains(s.Spices_Name)));
                    List<Recipe> results = resultsBySpices.FindAll(r => r.Ingredients.Any(ing => ingredients.Contains(ing.Ingredients_Name)));
                    return Ok(results);
                }

                return Ok(resultsByPreparation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("RecipeById")]
        public IHttpActionResult RecipeById(int id)
        {
            try
            {
                Recipe recipe = DB.GetRecipeById(id);
                if (recipe == null)
                    return Content(HttpStatusCode.NotFound, "recipe with id {" + id + "} was not found");
                return Ok(recipe);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("RecipeByUser")]
        public IHttpActionResult GetRecipesByUser(int user_id)
        {
            try
            {
                List<Recipe> recipe = DB.GetRecipesByUser(user_id);
                if (recipe == null)
                    return Content(HttpStatusCode.NotFound, "recipe for user id {" + user_id + "} was not found");
                return Ok(recipe);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /*
         * העלאת מתכון עידכון מתכון ומחיקת מתכון
         */
        // POST api/user
        [HttpPost]
        [Route("InsertRecipe")]
        public IHttpActionResult PostRecipe([FromBody] Recipe recipe)
        {
            try
            {
                recipe.Recipe_Id = DB.InsertRecipe(recipe);
                DB.InsertTBRecipeDetails(recipe);

                //DB.InsertPic(recipe);
             

                return Created(new Uri(Url.Link("GetByUser", new { id = recipe.Recipe_Id })), recipe.Recipe_Id);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not Upload -> " + ex.Message);
            }
        }

        // PUT api/user
        [HttpPut]
        [Route("UpdateRecipesDetais222")]
        public IHttpActionResult PutRecipe([FromBody] Recipe recipe)
        {
            try
            {
                DB.DeleteRecipDetailse(recipe);
                int res = DB.UpdateRecipe(recipe);
                DB.InsertTBRecipeDetails(recipe);
            
                return Created(new Uri(Url.Link("GetByUser", new { id = recipe.Recipe_Id })), recipe.Recipe_Id);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not update recipe -> " + ex.Message);
            }
        }
        // DELETE api/user
        [HttpDelete]
        [Route("DeleteRecipe")]
        public IHttpActionResult DeleteRecipe([FromBody] Recipe recipe)
        {
            try
            {
                int res = DB.DeleteRecipe(recipe);
                return Ok(res);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not Delete recipe -> " + ex.Message);
            }
        }

        // POST api/user
        [HttpPost]
        [Route("InsertTBRecipeDetails")]
        public IHttpActionResult InsertTBRecipeDetails([FromBody] Recipe recipe)
        {
            try
            {
                int u = DB.InsertTBRecipeDetails(recipe);
                return Created(new Uri(Url.Link("GetByUser", new { id = u })), u);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not Upload -> " + ex.Message);
            }
        }

        //// PUT api/user
        [HttpPut]
        [Route("UpdateTBUserRecipes")]
        public IHttpActionResult UpdateTBRecipeDetails([FromBody] Recipe recipe)
        {
            try
            {
                int res = DB.UpdateTBRecipeDetails(recipe);

                return Ok(res);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not update recipe -> " + ex.Message);
            }
        }
        /*
       * העלאת תבלין עידכון תבלין ומחיקת תבלין
       */
        // POST api/user
        [HttpPost]
        [Route("InsertSpicesToTBSpices")]
        public IHttpActionResult PostSpices([FromBody] Spices spices)
        {
            try
            {
                Spices u = DB.InsertSpices(spices);
                return Ok(u);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not Upload spice-> " + ex.Message);
            }
        }

        // PUT api/user
        [HttpPut]
        [Route("UpdateSpicesInTBSpicesn")]
        public IHttpActionResult PutSpices([FromBody] Spices spices)
        {
            try
            {
                int res = DB.UpdateSpices(spices);

                return Ok(res);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not update spice -> " + ex.Message);
            }
        }
        // DELETE api/user
        [HttpDelete]
        [Route("DeletSpicesFromTBSpices")]
        public IHttpActionResult DeleteSpices([FromBody] Spices spices)
        {
            try
            {
                int res = DB.DeleteSpices(spices);

                return Ok(res);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not Delete spice -> " + ex.Message);
            }
        }

        /*
       * העלאת מרכיב עידכון מרכיב ומחיקת מרכיב
       */
        // POST api/user
        [HttpPost]
        [Route("InsertIngredientsToTBIngredients")]
        public IHttpActionResult PostIngredients([FromBody] Ingredients ingredients)
        {
            try
            {
                Ingredients u = DB.InsertIngredients(ingredients);
                return Ok(u);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not Upload ingredients-> " + ex.Message);
            }
        }

        // PUT api/user
        [HttpPut]
        [Route("UpdateIngredientsInTBIngredients")]
        public IHttpActionResult PutIngredients([FromBody] Ingredients ingredients)
        {
            try
            {
                int res = DB.UpdateIngredients(ingredients);

                return Ok(res);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not update ingredients -> " + ex.Message);
            }
        }
        // DELETE api/user
        [HttpDelete]
        [Route("DeletIngredientsFromTBIngredients")]
        public IHttpActionResult DeleteIngredients([FromBody] Ingredients ingredients)
        {
            try
            {
                int res = DB.DeleteIngredients(ingredients);

                return Ok(res);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not Delete ingredients -> " + ex.Message);
            }
        }

        /*
       * העלאת אופן הכנה עידכון אופן הכנה ומחיקת אופן הכנה
       * העלאת אופן הכנה עידכון אופן הכנה ומחיקת אופן הכנה
       */
        // POST api/user
        [HttpPost]
        [Route("InsertPreparationToTBPreparation")]
        public IHttpActionResult PostPreparation([FromBody] Preparation preparation)
        {
            try
            {
                Preparation u = DB.InsertPreparation(preparation);
                return Ok(u);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not Upload preparation-> " + ex.Message);
            }
        }

        // PUT api/user
        [HttpPut]
        [Route("UpdatePreparationInTBPreparation")]
        public IHttpActionResult PutPreparation([FromBody] Preparation preparation)
        {
            try
            {
                int res = DB.UpdatePreparation(preparation);

                return Ok(res);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not update preparation -> " + ex.Message);
            }
        }
        // DELETE api/user
        [HttpDelete]
        [Route("DeletPreparationFromTBPreparation")]
        public IHttpActionResult DeletePreparation([FromBody] Preparation preparation)
        {
            try
            {
                int res = DB.DeletePreparation(preparation);

                return Ok(res);
            }
            catch (Exception ex)
            {
                // maybe to write into a file log
                return BadRequest("Did not Delete preparation -> " + ex.Message);
            }
        }

        //קבלת כל התבלינים
        [HttpGet]
        [Route("GetAllSpices")]
        public IHttpActionResult GetAllSpices()
        {
            try
            {
                List<Spices> spices = DB.GetTbSpices();
                if (spices == null)
                    return Content(HttpStatusCode.NotFound, "spices not found");
                return Ok(spices);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // קבלת כל המרכיבים
        [HttpGet]
        [Route("GetTBIngredients")]
        public IHttpActionResult GetTBIngredients()
        {
            try
            {
                List<Ingredients> Ingredients = DB.GetTBIngredients();
                if (Ingredients == null)
                    return Content(HttpStatusCode.NotFound, "Ingredients not found");
                return Ok(Ingredients);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // קבלת כל המרכיבים
        [HttpGet]
        [Route("GetTBPreparation")]
        public IHttpActionResult GetTBPreparation()
        {
            try
            {
                List<Preparation> preparations = DB.GetTbPreparation();
                if (preparations == null)
                    return Content(HttpStatusCode.NotFound, "Ingredients not found");
                return Ok(preparations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetRecipeSpices")]
        public IHttpActionResult GetRecipeSpice(int id)
        {
            try
            {
                List<Spices> recipe = DB.GetRecipeSpices(id);
                if (recipe == null)
                    return Content(HttpStatusCode.NotFound, "Spices with id {" + id + "} was not found");
                return Ok(recipe);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}