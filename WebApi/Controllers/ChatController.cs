using BChefApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BChefApi.Controllers
{
    [RoutePrefix("api/Messages")]
    public class ChatController : ApiController
    {
		[HttpGet]
		[Route("GetAllChatsByUserID/{UserID}")]
		public IHttpActionResult GetAllChatsByUserID(int UserID)
		{
			try
			{
				List<Chat> chats = new Database().GetAllChatsByUserID(UserID);
				if (chats != null)
					return Ok(chats);
				//If There Is Any Error The Database Returns An Empty List So Its Safe To Return It.
				return Content(HttpStatusCode.InternalServerError, chats);
			}
			catch (Exception ex)
			{
				return Content(HttpStatusCode.NoContent, ex.Message);
			}
		}
		
	}
}