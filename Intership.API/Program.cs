using System.Reflection;
using System.Text;
using Intership.Application.Commands.AddCandidate;
using Intership.Application.Commands.CreateRecruitmentSession;
using Intership.Application.Commands.CreateUser;
using Intership.Application.Interfaces;

using Intership.Application.Queries.GetAllCandidates;
using Intership.Application.Queries.GetAllRecruitmentSessions;
using Intership.Application.Queries.GetSummary;
using Intership.Application.Queries.GetUserById;
using Intership.Domain.Entities;
using Intership.Infrastructure.Data;
using Intership.Infrastructure.Data.Repository;
using Intership.Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Register DbContext
builder.Services.AddDbContext<IntershipDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Identity
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<IntershipDbContext>()
    .AddDefaultTokenProviders();

// Add Authentication and Authorization
builder.Services.AddAuthentication()
    .AddCookie(options =>
    {
        options.LoginPath = "/api/auth/login";
        options.AccessDeniedPath = "/api/auth/access-denied";
    });

// Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "https://localhost:7157",
            ValidAudience = "your-app-users",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MyVerySecretKey12345!"))
        };
    });

builder.Services.AddAuthorization();

// Register the repository
builder.Services.AddScoped<IIntershipRepository, IntershipRepository>();
builder.Services.AddScoped<IInternRepository, InternRepository>();
builder.Services.AddScoped<ICandidateRepository, CandidateRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRecruitmentSessionRepository, RecruitmentSessionRepository>();
builder.Services.AddScoped<ISuperVisorRepository, SuperVisorRepository>();

// Register MediatR and scan for handlers in the Application assembly
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
   Assembly.GetAssembly(typeof(Intership.Application.Commands.CreateIntern.CreateInternCommandHandler))));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    Assembly.GetAssembly(typeof(CreateUserCommandHandler))));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    Assembly.GetAssembly(typeof(GetUserByIdQueryHandler))));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    Assembly.GetAssembly(typeof(GetSummaryQueryHandler)),
    Assembly.GetAssembly(typeof(AddCandidateCommandHandler)),
    Assembly.GetAssembly(typeof(GetAllCandidatesQueryHandler)),
    Assembly.GetAssembly(typeof(CreateRecruitmentSessionCommandHandler)),
    Assembly.GetAssembly(typeof(GetAllRecruitmentSessionsQueryHandler))
));

builder.Services.AddControllers();
builder.Services.AddControllersWithViews();  // Register MVC services for views
// Configure Swagger/OpenAPI to include JWT authentication
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // Enable Swagger to recognize the Bearer token
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your Bearer token"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthentication();  // Add Authentication middleware
app.UseAuthorization();

app.MapControllers();

app.Run();
