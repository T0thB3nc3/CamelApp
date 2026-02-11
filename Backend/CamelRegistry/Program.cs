using CamelRegistry.Classes;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<CamelDbContext>(options =>
    options.UseSqlite("Data Source=camels.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowAngular");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<CamelDbContext>();
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/api/camels", async (CamelDbContext db) =>
    await db.Camels.ToListAsync());

app.MapGet("/api/camels/{id}", async(int id, CamelDbContext db)=>
    await db.Camels.FindAsync(id) is Camel camel ? Results.Ok(camel) : Results.NotFound());

app.MapPost("/api/camels", async (Camel camel,CamelDbContext db) =>
{
    if (camel.HumpCount < 1 || camel.HumpCount > 2) return Results.BadRequest("A púpok száma csak 1 vagy 2 lehet.");

    db.Camels.Add(camel);
    await db.SaveChangesAsync();
    return Results.Created($"/api/camels/{camel.Id}", camel);
});

app.MapPost("api/camels/{id}/feed", async (int id, CamelDbContext db) =>
{
    var camel = await db.Camels.FindAsync(id);
    if (camel is null) return Results.NotFound();

    camel.LastFed = DateTime.Now;
    await db.SaveChangesAsync();

    return Results.Ok(camel);
});

app.MapPut("/api/camels/{id}", async (int id, Camel inputCamel, CamelDbContext db) =>
{
    var camel = await db.Camels.FindAsync(id);
    if (camel is null) return Results.NotFound();

    camel.Name = inputCamel.Name;
    camel.Color = inputCamel.Color;
    camel.HumpCount = inputCamel.HumpCount;
    camel.LastFed = DateTime.Now;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/api/camels/{id}", async (int id, CamelDbContext db) =>
{
    if (await db.Camels.FindAsync(id) is Camel camel)
    {
        db.Camels.Remove(camel);
        await db.SaveChangesAsync();
        return Results.Ok(camel);
    }
    return Results.NotFound();
});

app.Run();
