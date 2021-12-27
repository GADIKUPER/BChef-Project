using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BChefApi.Models
{
    public class DL
    {
        private static string conStr;
        //private static bool local = false;
        private static SqlConnection Con = null;
        private static SqlDataAdapter _adtr = null;
        private static SqlCommand _command = null;

        public static SqlConnection ConMan()
        {
            bool localWebAPI = false;//before doing publish need to be false
            bool sqlLocal = false;//before doing publish need to be false

            conStr = ConfigurationManager.ConnectionStrings["Production"].ConnectionString;

            Con = new SqlConnection(conStr);
            Con.Open();
            return Con;
        }

        public static DataTable GetUsers()
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("GetUsers", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "TBUsers");

                if (ds.Tables["TBUsers"].Rows.Count != 0)
                    return ds.Tables["TBUsers"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        internal static DataTable GetRecipes()
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("GetAllRecipes", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "TABLE");

                if (ds.Tables["TABLE"].Rows.Count != 0)
                    return ds.Tables["TABLE"];
            }
            catch (Exception e)
            {
                //throw new Exception(e.Message);
                return null;
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

      
        // העלאת תבלין
         internal static Spices InsertSpices(string Spices_Name)
        {
            Spices spice = null;
            try
            {
                Con = ConMan();
                _command = new SqlCommand("InsertSpicesToTBSpices", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("Spices_Name", Spices_Name));
                
                using (SqlDataReader dataReader = _command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        var Spices_Code = (int)dataReader["Spices_Code"];
                        var Spices_Name2 = dataReader["Spices_Name"].ToString();
                        spice = new Spices(Spices_Code, Spices_Name2);
                    }
                }
                return spice;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        //  עידכון תבלין 
         internal static int UpdateSpices(int Spices_Code,string Spices_Name)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("UpdateSpicesInTBSpicesn", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("Spices_Code", Spices_Code));
                _command.Parameters.Add(new SqlParameter("Spices_Name", Spices_Name));
                
                return _command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }
        // מחיקת תבלין
        internal static int DeleteSpices(int Spices_Code)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("DeletSpicesFromTBSpices", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("Spices_Code", Spices_Code));
                
                return _command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

          // העלאת מרכיב
         internal static Ingredients InsertIngredients(string Ingredients_Name)
        {
            Ingredients ingredients = null;
            try
            {
                Con = ConMan();
                _command = new SqlCommand("InsertIngredientsToTBIngredients", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("Ingredients_Name", Ingredients_Name));

                using (SqlDataReader dataReader = _command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        var Ingredients_Code = (int)dataReader["Ingredients_Code"];
                        var Ingredients_Name2 = dataReader["Ingredients_Name"].ToString();
                        ingredients = new Ingredients(Ingredients_Code, Ingredients_Name2);
                    }
                }
                return ingredients;
               
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        //  עידכון מרכיב
         internal static int UpdateIngredients(int Ingredients_Code,string Ingredients_Name)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("UpdateIngredientsInTBIngredients", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("Ingredients_Code", Ingredients_Code));
                _command.Parameters.Add(new SqlParameter("Ingredients_Name", Ingredients_Name));
                
                return _command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }
        // מחיקת מרכיב
        internal static int DeleteIngredients(int Ingredients_Code)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("DeletIngredientsFromTBIngredients", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("Ingredients_Code", Ingredients_Code));
                
                return _command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

          // העלאת אופן הכנה
         internal static Preparation InsertPreparation(string Preparation_Name)
        {
            Preparation preparation = null;
            try
            {
                Con = ConMan();
                _command = new SqlCommand("InsertPreparationToTBPreparation", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("Preparation_Name", Preparation_Name));

                using (SqlDataReader dataReader = _command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        var Preparation_Code = (int)dataReader["Preparation_Code"];
                        var Preparation_Name2 = dataReader["Preparation_Name"].ToString();
                        preparation = new Preparation(Preparation_Code, Preparation_Name2);
                    }
                }
                return preparation;
               
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        //  עידכון אופן הכנה
         internal static int UpdatePreparation(int Preparation_Code,string Preparation_Name)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("UpdatePreparationInTBPreparation", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("Preparation_Code", Preparation_Code));
                _command.Parameters.Add(new SqlParameter("Preparation_Name", Preparation_Name));
                
                return _command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }
        // מחיקת אופן הכנה
        internal static int DeletePreparation(int Preparation_Code)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("DeletPreparationFromTBPreparation", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("Preparation_Code", Preparation_Code));
                
                return _command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }
        // העלאת מתכון
          internal static int InsertRecipe(int userID, string recipeName,string recipePictureUri, int preparation_Code, string note)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("InsertRecipe", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("@UserID", userID));
                _command.Parameters.Add(new SqlParameter("@RecipeName", recipeName));
                _command.Parameters.Add(new SqlParameter("@RecipePictureUri", recipePictureUri));
                _command.Parameters.Add(new SqlParameter("@Preparation_Code", preparation_Code));
                _command.Parameters.Add(new SqlParameter("@Note", note));

                _command.Parameters.Add("@Recipe_Id", SqlDbType.Int);
                _command.Parameters["@Recipe_Id"].Direction = ParameterDirection.Output;
                _command.ExecuteNonQuery();
                return Convert.ToInt32(_command.Parameters["@Recipe_Id"].Value);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
          }

         // עידכון מתכון
          internal static int UpdateRecipe(int Recipe_Id, string recipeName, string recipePictureUri, int preparation_Code, string note)
          {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("UpdateTBUserRecipes", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _command.Parameters.Add(new SqlParameter("@Recipe_Id", Recipe_Id));
                _command.Parameters.Add(new SqlParameter("@RecipeName", recipeName));
                _command.Parameters.Add(new SqlParameter("@RecipePictureUri", recipePictureUri));
                _command.Parameters.Add(new SqlParameter("@Preparation_Code", preparation_Code));
                _command.Parameters.Add(new SqlParameter("@Note", note));
                _command.ExecuteNonQuery();
                return Convert.ToInt32(_command.Parameters["@res"].Value);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
          }

          // מחיקת מתכון
         internal static int DeleteRecipe(int Recipe_Id)
         {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("DeleteRecipe", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("@Recipe_Id", Recipe_Id));
              
                return _command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        // העלאת מרכיבי מתכון
        internal static int InsertTBRecipeDetails(int Recipe_Id, int Spices = 0, int Ingredients=0)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("InsertTBRecipeDetails", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("@Recipe_Id", Recipe_Id));
                _command.Parameters.Add(new SqlParameter("@Spices_Code", Spices));
                _command.Parameters.Add(new SqlParameter("@Ingredients_Code", Ingredients));

                return _command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        //  עידכון מרכיבי מתכון 
        internal static int UpdateTBRecipeDetails(int Recipe_Id, int Spices = 0, int Ingredients = 0)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("UpdateTBRecipeDetails", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("@Recipe_Id", Recipe_Id));
                _command.Parameters.Add(new SqlParameter("@Spices_Code", Spices));
                _command.Parameters.Add(new SqlParameter("@Ingredients_Code", Ingredients));

                return _command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        internal static int DeleteRecipeDetails(int Recipe_Id)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("DeleteRecipeDetails", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("@Recipe_Id", Recipe_Id));

                return _command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        internal static DataTable GetRecipesByUser(int user_id)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("RecipeByUser", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _command.Parameters.Add(new SqlParameter("UserID", user_id));

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "TABLE");

                if (ds.Tables["TABLE"].Rows.Count != 0)
                    return ds.Tables["TABLE"];
            }
            catch (Exception e)
            {
                //throw new Exception(e.Message);
                return null;
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        internal static DataTable GetRecipeById(int id)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("RecipeById", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _command.Parameters.Add(new SqlParameter("Recipe_Id", id));

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "TABLE");

                if (ds.Tables["TABLE"].Rows.Count != 0)
                    return ds.Tables["TABLE"];
            }
            catch (Exception e)
            {
                //throw new Exception(e.Message);
                return null;
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

       
        internal static DataTable GetRecipeSpices(int id)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("GetRecipeSpices", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _command.Parameters.Add(new SqlParameter("Recipe_Id", id));

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "TABLE");

                if (ds.Tables["TABLE"].Rows.Count != 0)
                    return ds.Tables["TABLE"];
            }
            catch (Exception e)
            {
                //throw new Exception(e.Message);
                return null;
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        internal static DataTable GetRecipeIngerdients(int id)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("GetRecipeIng", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _command.Parameters.Add(new SqlParameter("Recipe_Id", id));

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "TABLE");

                if (ds.Tables["TABLE"].Rows.Count != 0)
                    return ds.Tables["TABLE"];
            }
            catch (Exception e)
            {
                //throw new Exception(e.Message);
                return null;
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static int Register(string FirstName, string LastName, string Email, string Password, string Picture,string Gender)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("regisrerNewAccount", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _command.Parameters.Add(new SqlParameter("@FirstName", FirstName));
                _command.Parameters.Add(new SqlParameter("@LastName", LastName));
                _command.Parameters.Add(new SqlParameter("@Email", Email));
                _command.Parameters.Add(new SqlParameter("@Password", Password));
                _command.Parameters.Add(new SqlParameter("@PictureUri", Picture));
                _command.Parameters.Add(new SqlParameter("@Gender", Gender));
                _command.Parameters.Add("@UserId", SqlDbType.Int);
                _command.Parameters["@UserId"].Direction = ParameterDirection.Output;
                _command.ExecuteNonQuery();
                return Convert.ToInt32(_command.Parameters["@UserId"].Value);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            //return null;
        }


        public static Users Login(string email, string password)
        {
            Users user = null;
            try
            {
                Con = ConMan();
                _command = new SqlCommand("Login", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _command.Parameters.Add(new SqlParameter("Email", email));
                _command.Parameters.Add(new SqlParameter("Password", password));

                using (SqlDataReader dataReader = _command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        var ID = (int)dataReader["UserID"];
                        var FirstName = dataReader["FirstName"].ToString();
                        var LastName = dataReader["LastName"].ToString();
                        var Email = dataReader["Email"].ToString();
                        var PictureUri = dataReader["PictureUri"].ToString();
                        var Gender = dataReader["Gender"].ToString();
                        var UserType = (int)dataReader["UserType"];
                        user = new Users(ID,FirstName,LastName,Email,PictureUri,Gender,UserType);
                    }
                }

                return user;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
          
        }

        public static Users UpdateEditProfile(int ID, string FirstName, string LastName, string Picture)
        {
            Users user = null;
            try
            {
                Con = ConMan();
                _command = new SqlCommand("EditProfile", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("@UserID", ID));
                _command.Parameters.Add(new SqlParameter("@FirstName", FirstName));
                _command.Parameters.Add(new SqlParameter("@LastName", LastName));
                _command.Parameters.Add(new SqlParameter("@PictureUri", Picture));
                //return _command.ExecuteNonQuery();
                using (SqlDataReader dataReader = _command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        var ID2 = (int)dataReader["UserID"];
                        var FirstName2 = dataReader["FirstName"].ToString();
                        var LastName2 = dataReader["LastName"].ToString();
                        var Email = dataReader["Email"].ToString();
                        var PictureUri2 = dataReader["PictureUri"].ToString();
                        var Gender = dataReader["Gender"].ToString();
                        var UserType = 1;
                        user = new Users(ID2, FirstName2, LastName2,Email,PictureUri2,Gender,UserType);
                    }
                }

                return user;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
        }

        public static DataTable SendResetPasswordEmail(string email)
        {
            try
            {
                Con.Open();
                _command = new SqlCommand("ResetPasswordRequest", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _command.Parameters.Add(new SqlParameter("Email", email));

                DataSet ds = new DataSet();
                _adtr = new SqlDataAdapter(_command);

                _adtr.Fill(ds, "ResetPasswordRequest");
                if (ds.Tables["ResetPasswordRequest"].Rows.Count != 0)
                    return ds.Tables["ResetPasswordRequest"];
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static DataTable ResetPassword(string uid, string newPassword)
        {
            try
            {
                Con.Open();
                _command = new SqlCommand("ResetPassword", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _command.Parameters.Add(new SqlParameter("uid", uid));
                _command.Parameters.Add(new SqlParameter("NewPassword", newPassword));

                DataSet ds = new DataSet();
                _adtr = new SqlDataAdapter(_command);

                _adtr.Fill(ds, "ResetPassword");
                if (ds.Tables["ResetPassword"].Rows.Count != 0)
                    return ds.Tables["ResetPassword"];
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

         internal static DataTable GetTbSpices()
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("GetTBSpices", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "TABLE");

                if (ds.Tables["TABLE"].Rows.Count != 0)
                    return ds.Tables["TABLE"];
            }
            catch (Exception e)
            {
                //throw new Exception(e.Message);
                return null;
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        internal static DataTable GetTBPreparation()
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("GetTBPreparation", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "TABLE");

                if (ds.Tables["TABLE"].Rows.Count != 0)
                    return ds.Tables["TABLE"];
            }
            catch (Exception e)
            {
                //throw new Exception(e.Message);
                return null;
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

          internal static DataTable GetTBIngredients()
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("GetTBIngredients", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "TABLE");

                if (ds.Tables["TABLE"].Rows.Count != 0)
                    return ds.Tables["TABLE"];
            }
            catch (Exception e)
            {
                //throw new Exception(e.Message);
                return null;
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }
        

    }
}