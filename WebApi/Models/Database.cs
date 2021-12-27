


using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace BChefApi.Models
{
   
    public class Database
    {
        private static readonly string connectionString = ConfigurationManager.ConnectionStrings["Local"].ConnectionString;
        //Server Url Is Used For Image Uploads.
        //ImageController Is Using It For Getting A Path To Store The Image In.
        public static string GetServerUrl()
        {
            var request = HttpContext.Current.Request;

            return request.Url.Scheme + "://" + request.Url.Authority + request.ApplicationPath.TrimEnd('/');
        }

        public List<Chat> GetAllChatsByUserID(int UserID)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string ProcedureName = "GetAllChatsByUserID";
                    SqlCommand command = new SqlCommand(ProcedureName, con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@UserID", UserID);
                    con.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    List<Chat> Chats = new List<Chat>();
                    while (reader.Read())
                    {
                        Chat chat = new Chat();
                        chat.Chat_ID = int.Parse(reader["Chat_ID"].ToString());
                        chat.UserID_1 = int.Parse(reader["UserID_1"].ToString());
                        chat.UserID_2 = int.Parse(reader["UserID_2"].ToString());

                        Chats.Add(chat);
                    }
                    return Chats;
                }
            }
            catch (Exception)
            {
                return new List<Chat>();
            }
        }
    }
}