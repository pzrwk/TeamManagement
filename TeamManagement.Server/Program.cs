using TeamManagement.Application.Member.Commands;
using TeamManagement.Application.Member.Queries;
using TeamManagement.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Configuration.AddJsonFile("appsettings.json", optional: false);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors((options) =>
{
    options.AddPolicy("AllowSpecificOrigin",
                builder => builder.WithOrigins("https://localhost:5173/")
                                  .AllowAnyHeader()
                                  .AllowAnyMethod());
});

builder.Services
    .AddDbContext(builder.Configuration.GetConnectionString("DefaultConnectionString")!)
    .AddApplication()
    .AddMediatRServices()
    .AddInfrastructure();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors((options) =>
{
    options.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials();
});
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
