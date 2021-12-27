using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BChefApi.Models
{
    public class DB
    {
        public static List<Users> GetUsers()
        {
            List<Users> users = new List<Users>();
            DataTable res = DL.GetUsers();

            if (res == null)
            {
                return null;
            }

            foreach (DataRow row in res.Rows)
            {
                if (users == null)
                    users = new List<Users>();
                users.Add(new Users()
                {
                    ID = int.Parse(row["UserID"].ToString()),
                    FirstName = row["FirstName"].ToString(),
                    LastName = row["LastName"].ToString(),
                    Email = row["Email"].ToString(),
                    Password = row["Password"].ToString(),
                    PictureUri = row["PictureUri"].ToString(),
                    Gender = row["Gender"].ToString()

                });
            }
            return users;
        }

        internal static List<Recipe> GetRecipes()
        {
            List<Recipe> recipe = new List<Recipe>();
            DataTable res = DL.GetRecipes();

            if (res == null)
                return null;
            int EqualsRecipeId = 0;
            foreach (DataRow row in res.Rows)
            {
                int count = 0;
                
                int recipeId = int.Parse(row["Recipe_Id"].ToString());
                if (!recipeId.Equals(EqualsRecipeId))
                {
                    recipe.Add(new Recipe()
                    {
                        Recipe_Id = recipeId,
                        UserID = int.Parse(row["UserID"].ToString()),
                        RecipeName = row["RecipeName"].ToString(),
                        RecipePictureUri = row["RecipePictureUri"].ToString(),
                        Preparation_Code = int.Parse(row["Preparation_Code"].ToString()),
                        Preparation_Name = row["Preparation_Name"].ToString(),
                        Note = row["Note"].ToString(),
                        FirstName = row["FirstName"].ToString(),
                        LastName = row["LastName"].ToString(),
                        UserPictureUri = row["PictureUri"].ToString(),
                        Spices = GetRecipeSpices(recipeId),
                        Ingredients = GetRecipeIngredients(recipeId)
                    });
                }
                EqualsRecipeId = recipeId;


            }
            return recipe;
        }
        // העלאה עידכון ומחיקה של מתכון
        internal static int InsertRecipe(Recipe recipe)
        {
            int res = DL.InsertRecipe(recipe.UserID, recipe.RecipeName, recipe.RecipePictureUri , recipe.Preparation_Code, recipe.Note);
            return res;
        }

         internal static int UpdateRecipe(Recipe recipe)
        {
            int res = DL.UpdateRecipe(recipe.Recipe_Id,recipe.RecipeName ,recipe.RecipePictureUri , recipe.Preparation_Code, recipe.Note);

            return res;
        }

        // העלאה ועידכון של מריבי ותבליני המתכון
        internal static int InsertTBRecipeDetails(Recipe recipe)
        {
            int res = 0;
            for (int i = 0; i < recipe.Spices.Count; i++)
            {
               if(recipe.Spices[i] != null)
                {
                    res += DL.InsertTBRecipeDetails(recipe.Recipe_Id, recipe.Spices[i].Spices_Code,0);
                }
            }

            for (int i = 0; i < recipe.Ingredients.Count; i++)
            {
               if(recipe.Ingredients[i] != null)
                {
                    res += DL.InsertTBRecipeDetails(recipe.Recipe_Id,0, recipe.Ingredients[i].Ingredients_Code);
                }
            }
            return res;
        }

        internal static int UpdateTBRecipeDetails(Recipe recipeDitales)
        {
            int res = 0;
            for (int i = 0; i < recipeDitales.Spices.Count; i++)
            {
                res += DL.UpdateTBRecipeDetails(recipeDitales.Recipe_Id, recipeDitales.Spices[i].Spices_Code, 0);
            }

            for (int i = 0; i < recipeDitales.Ingredients.Count; i++)
            {
                res += DL.UpdateTBRecipeDetails(recipeDitales.Recipe_Id, 0, recipeDitales.Ingredients[i].Ingredients_Code);
            }
            return res;
        }
        internal static int DeleteRecipe(Recipe recipe)
        {
            int res = DL.DeleteRecipe(recipe.Recipe_Id);

            return res;
        }

        internal static int DeleteRecipDetailse(Recipe recipe)
        {
            int res = DL.DeleteRecipeDetails(recipe.Recipe_Id);

            return res;
        }

        // העלאה עידכון ומחיקה של תבלין
        internal static Spices InsertSpices(Spices spices)
        {
            Spices res = DL.InsertSpices(spices.Spices_Name);
            return res;
        }

         internal static int UpdateSpices(Spices spices)
        {
            int res = DL.UpdateSpices(spices.Spices_Code,spices.Spices_Name);

            return res;
        }

         internal static int DeleteSpices(Spices spices)
        {
            int res = DL.DeleteSpices(spices.Spices_Code);

            return res;
        }

        // העלאה עידכון ומחיקה של מרכיב
        internal static Ingredients InsertIngredients(Ingredients ingredients)
        {
            Ingredients res = DL.InsertIngredients(ingredients.Ingredients_Name);
            return res;
        }

         internal static int UpdateIngredients(Ingredients ingredients)
        {
            int res = DL.UpdateIngredients(ingredients.Ingredients_Code,ingredients.Ingredients_Name);

            return res;
        }

         internal static int DeleteIngredients(Ingredients ingredients)
        {
            int res = DL.DeleteIngredients(ingredients.Ingredients_Code);

            return res;
        }

         // העלאה עידכון ומחיקה של אופן הכנה
        internal static Preparation InsertPreparation(Preparation preparation)
        {
            Preparation res = DL.InsertPreparation(preparation.Preparation_Name);
            return res;
        }

         internal static int UpdatePreparation(Preparation preparation)
        {
            int res = DL.UpdatePreparation(preparation.Preparation_Code,preparation.Preparation_Name);

            return res;
        }

         internal static int DeletePreparation(Preparation preparation)
        {
            int res = DL.DeletePreparation(preparation.Preparation_Code);

            return res;
        }

      
        internal static List<Recipe> GetRecipesByUser(int user_id)
        {
            List<Recipe> recipe = new List<Recipe>();
            DataTable res = DL.GetRecipesByUser(user_id);

            int EqualsRecipeId = 0;
            foreach (DataRow row in res.Rows)
            {
                int recipeId = int.Parse(row["Recipe_Id"].ToString());
                if (!recipeId.Equals(EqualsRecipeId))
                {
                    recipe.Add(new Recipe()
                    {
                        Recipe_Id = recipeId,
                        UserID = int.Parse(row["UserID"].ToString()),
                        RecipeName = row["RecipeName"].ToString(),
                        RecipePictureUri = row["RecipePictureUri"].ToString(),
                        Preparation_Code = int.Parse(row["Preparation_Code"].ToString()),
                        Preparation_Name = row["Preparation_Name"].ToString(),
                        Note = row["Note"].ToString(),
                        FirstName = row["FirstName"].ToString(),
                        LastName = row["LastName"].ToString(),
                        UserPictureUri = row["PictureUri"].ToString(),
                        Spices = GetRecipeSpices(recipeId),
                        Ingredients = GetRecipeIngredients(recipeId),


                    });
                }
                EqualsRecipeId = recipeId;
                

            }
            return recipe;
        }

        internal static Recipe GetRecipeById(int id)
        {
            Recipe recipe = new Recipe();
            DataTable res = DL.GetRecipeById(id);

            if (res == null)
            {
                return null;
            }

            foreach (DataRow row in res.Rows)
            {
                recipe.Recipe_Id = int.Parse(row["Recipe_Id"].ToString());
                //if(recipe.Recipe_Id)
                recipe.UserID = int.Parse(row["UserID"].ToString());
                recipe.RecipeName = row["RecipeName"].ToString();
                recipe.RecipePictureUri = row["RecipePictureUri"].ToString();
                recipe.Preparation_Code = int.Parse(row["Preparation_Code"].ToString());
                recipe.Preparation_Name = row["Preparation_Name"].ToString();
                recipe.Note = row["Note"].ToString();
                recipe.FirstName = row["FirstName"].ToString();
                recipe.LastName = row["LastName"].ToString();
                recipe.UserPictureUri = row["PictureUri"].ToString();
                recipe.Spices = GetRecipeSpices(id);
                recipe.Ingredients = GetRecipeIngredients(id);
               
            }
            return recipe;

        }
        internal static List<Spices> GetRecipeSpices(int id)
        {
            List<Spices> spices = new List<Spices>();
            DataTable res = DL.GetRecipeSpices(id);

            foreach (DataRow row in res.Rows)
            {
                spices.Add(new Spices()
                {
                    Spices_Code = int.Parse(row["Spices_Code"].ToString()),
                    Spices_Name = row["Spices_Name"].ToString()
                });

            }

            return spices;

        }

        internal static List<Ingredients> GetRecipeIngredients(int id)
        {
            List<Ingredients> ingredients = new List<Ingredients>();
            DataTable res = DL.GetRecipeIngerdients(id);

            foreach (DataRow row in res.Rows)
            {
                ingredients.Add(new Ingredients()
                {
                    Ingredients_Code = int.Parse(row["Ingredients_Code"].ToString()),
                    Ingredients_Name = row["Ingredients_Name"].ToString()
                });

            }

            return ingredients;

        }

        /*
        internal static List<Preparation> GetRecipeIngredients(int id)
        {
            List<Preparation> preparations = new List<Preparation>();
            DataTable res = DL.GetRecipeIngerdients(id);

            foreach (DataRow row in res.Rows)
            {
                preparations.Add(new Preparation()
                {
                    Preparation_Code = int.Parse(row["Preparation_Code"].ToString()),
                    Preparation_Name = row["Preparation_Name"].ToString()
                });

            }

            return preparations;

        }
        */

        public static int Register(string FirstName, string LastName, string Email, string Password, string PictureUri, string Gender)
        {
            int res = DL.Register(FirstName, LastName, Email, Password, PictureUri, Gender);

            return res;
        }

        public static Users Login(string Email, string Password)
        {
            Users res = DL.Login(Email, Password);

            if (res == null)
                return null;

            return res;
        }

        public static Users UpdateEditProfile(int ID, string FirstName, string LastName, string PictureUri)
        {

            Users res = DL.UpdateEditProfile(ID, FirstName, LastName, PictureUri);

            return res;
        }

        public static ResetPasswordRequest SendResetPasswordEmail(string email)
        {
            DataTable res = DL.SendResetPasswordEmail(email);


            if (res == null)
                return null;

            if (Convert.ToBoolean((int)res.Rows[0]["ReturnCode"]))
            {
                ResetPasswordRequest result = new ResetPasswordRequest()
                {
                    UniqueID = res.Rows[0]["UniqueID"].ToString(),
                    Email = email,
                };
                return result;
            }

            return null;
        }

        public static bool ResetPassword(string uid, string newPassword)
        {
            DataTable res = DL.ResetPassword(uid, newPassword);

            if (res == null)
                return false;

            bool result = Convert.ToBoolean((int)res.Rows[0]["ReturnCode"]);

            return result;

        }

         public static List<Spices> GetTbSpices()
        {
            List<Spices> spice = new List<Spices>();
            DataTable res = DL.GetTbSpices();

            if (res == null)
            {
                return null;
            }

            foreach (DataRow row in res.Rows)
            {
                if (spice == null)
                    spice = new List<Spices>();

                spice.Add(new Spices()
                {
                    Spices_Code = int.Parse(row["Spices_Code"].ToString()),
                    Spices_Name = row["Spices_Name"].ToString()
                });
            }
            return spice;
        }

          public static List<Preparation> GetTbPreparation()
        {
            List<Preparation> preparation = new List<Preparation>();
            DataTable res = DL.GetTBPreparation();

            if (res == null)
            {
                return null;
            }

            foreach (DataRow row in res.Rows)
            {
                if (preparation == null)
                    preparation = new List<Preparation>();

                preparation.Add(new Preparation()
                {
                    Preparation_Code = int.Parse(row["Preparation_Code"].ToString()),
                    Preparation_Name = row["Preparation_Name"].ToString()
                });
            }
            return preparation;
        }

         public static List<Ingredients> GetTBIngredients()
        {
            List<Ingredients> ingredients = new List<Ingredients>();
            DataTable res = DL.GetTBIngredients();

            if (res == null)
            {
                return null;
            }

            foreach (DataRow row in res.Rows)
            {
                if (ingredients == null)
                    ingredients = new List<Ingredients>();

                ingredients.Add(new Ingredients()
                {
                    Ingredients_Code = int.Parse(row["Ingredients_Code"].ToString()),
                    Ingredients_Name = row["Ingredients_Name"].ToString()
                });
            }
            return ingredients;
        }
    }
}