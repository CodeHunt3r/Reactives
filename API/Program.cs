using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Add DB Context Service & give it a connection String from the appsettings
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});


builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyMethod().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
});


var app = builder.Build();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

//Using after we finished using Scope anything in it will be disposed / destroyed + Clean from Memory
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;


// Try Create DB else catch Exception
try
{
    var context = services.GetRequiredService<DataContext>(); 
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}

catch(Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
