using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BChefApi.Models
{
    public class Users
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PictureUri { get; set; }
        public string Gender { get; set; }
        public int UserType { get; set; }

        public Users()
        {

        }

        public Users(int iD, string firstName, string lastName, string email, string pictureUri,string gender,int userType)
        {
            ID = iD;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            PictureUri = pictureUri;
            Gender = gender;
            UserType = userType;
        }
    }
}