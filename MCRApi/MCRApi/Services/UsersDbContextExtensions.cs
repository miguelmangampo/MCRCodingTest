using System.Collections.Generic;
using System.Linq;
using MCRApi.Entities;
using System;
namespace MCRApi.Services
{
    public static class UsersDbContextExtensions
    {
        public static void CreateSeedData (this MCRDbContext context)
        {
            if (context.Users.Any())
                return;
            var users = new List<Users>()
            {
                new Users()
                {
                    firstname = "Miguel Salvador",
                    lastname = "Mangampo",
                    username = "miguel",
                    password = "miguel",
                    createdAt = new DateTime(),
                    updatedAt = new DateTime()
                },
                new Users()
                {
                    firstname = "Harry",
                    lastname = "Camigla",
                    username = "harry",
                    password = "harry",
                    createdAt = new DateTime(),
                    updatedAt = new DateTime()
                }
            };
            context.Users.AddRange(users);
            context.SaveChanges();
        }
    }
}