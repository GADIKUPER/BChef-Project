using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BChefApi.Models
{
    public class Spices {
        public Spices(int spices_Code, string spices_Name)
        {
            Spices_Code = spices_Code;
            Spices_Name = spices_Name;
        }
        public Spices()
        {

        }
        public int Spices_Code { get; set; }
        public string Spices_Name { get; set; }
    }

    public class Ingredients {
       

        public int Ingredients_Code { get; set; }
        public string Ingredients_Name { get; set; }

        public Ingredients()
        {
        }

        public Ingredients(int ingredients_Code, string ingredients_Name)
        {
            Ingredients_Code = ingredients_Code;
            Ingredients_Name = ingredients_Name;
        }
    }
    
    public class Pics
    {
       

        public int Recipe_Id { get; set; }
        public string PictureUri { get; set; }
        public string PictureName { get; set; }

        public Pics()
        {
        }

        public Pics(int recipe_Id, string pictureUri, string pictureName)
        {
            Recipe_Id = recipe_Id;
          
            PictureUri = pictureUri;

            PictureName = pictureName;
        }
    }

    public class Preparation
    {
       

        public int Preparation_Code { get; set; }
        public string Preparation_Name { get; set; }
        public Preparation()
        {
        }

        public Preparation(int preparation_Code, string preparation_Name)
        {
            Preparation_Code = preparation_Code;
            Preparation_Name = preparation_Name;
        }
    }

    public class Recipe
    {
       

        public int Recipe_Id { get; set; }
        public int UserID { get; set; }
        public string RecipeName { get; set; }
        public string RecipePictureUri { get; set; }
        public int Preparation_Code { get; set; }
        public string Preparation_Name { get; set; }
        public string Note { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserPictureUri { get; set; }

        public List<Spices> Spices { get; set; }

        public List<Ingredients> Ingredients { get; set; }
       

        public Recipe()
        {
        }

        public Recipe(int recipe_Id, int userID,string recipeName,string recipePictureUri, int preparation_Code, string preparation_Name, string note, string firstName, string lastName, string userPictureUri, List<Spices> spices, List<Ingredients> ingredients)
        {
            Recipe_Id = recipe_Id;
            UserID = userID;
            RecipeName = recipeName;
            RecipePictureUri = recipePictureUri;
            Preparation_Code = preparation_Code;
            Preparation_Name = preparation_Name;
            Note = note;
            FirstName = firstName;
            LastName = lastName;
            UserPictureUri = userPictureUri;
            Spices = spices;
            Ingredients = ingredients;
           
        }
       

    }
}