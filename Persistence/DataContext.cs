﻿using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{

    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions options) : base(options){}

        //DB Set represents a Table inside our DB
        public DbSet<Activity> Activities { get; set; }

    }
}
