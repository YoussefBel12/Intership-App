using System.Reflection;
using System.Text;
using Intership.Application.Commands.AddCandidate;
using Intership.Application.Commands.CreateRecruitmentSession;
//using Intership.Application.Commands.CreateUser;
using Intership.Application.Interfaces;
using Microsoft.AspNetCore.Cors;
using Intership.Application.Queries.GetAllCandidates;
using Intership.Application.Queries.GetAllRecruitmentSessions;
using Intership.Application.Queries.GetSummary;
//using Intership.Application.Queries.GetUserById;
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
using Intership.Application.DTOs;
using MediatR;
using Intership.Infrastructure.Count;
using Microsoft.Extensions.FileProviders;
using Intership.Infrastructure.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add CORS services to the container
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod()
        //next line below i added from a video looks important
              .AllowCredentials();
    });
});




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
           // ValidIssuer = "https://localhost:7157",
           ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
           // ValidAudience = "your-app-users",
           ValidAudience = builder.Configuration["JwtSettings:Audience"],
            //    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MyVerySecretKey12345!"))
            // chose one this one look like appsettin but i take from appsting directly in next line  IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourVerySecretKeyThatIsAtLeast32BytesLong12345! "))
         //   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]  )),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]))
        };
    });

builder.Services.AddAuthorization();

// Register the repository
builder.Services.AddScoped<IIntershipRepository, IntershipRepository>();
builder.Services.AddScoped<IInternRepository, InternRepository>();
builder.Services.AddScoped<ICandidateRepository, CandidateRepository>();
//builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRecruitmentSessionRepository, RecruitmentSessionRepository>();
builder.Services.AddScoped<ISuperVisorRepository, SuperVisorRepository>();

builder.Services.AddScoped<IRequestHandler<GetActiveRecruitmentSessionQuery, RecruitmentSessionDto>, GetActiveRecruitmentSessionQueryHandler>();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Intership.Infrastructure.Identity.AssignSupervisorCommandHandler).Assembly));

builder.Services.AddSingleton<IConfiguration>(builder.Configuration);


builder.Services.AddHttpClient();



//just delete this it controller count intern real app intern
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblyContaining<GetInternUserCountQueryHandler>();
});




//cvfile thing repo and stuff
// Get the uploads path from configuration
var uploadsPath = builder.Configuration.GetValue<string>("UploadsPath");
if (string.IsNullOrEmpty(uploadsPath))
{
    throw new InvalidOperationException("UploadsPath configuration is missing.");
}
builder.Services.AddScoped<IFileStorageService>(provider => new LocalFileStorageService(uploadsPath));










// Register the file storage service
var cvFolderPath = builder.Configuration.GetValue<string>("CvFolderPath");
builder.Services.AddScoped<ILocalCvFileStorageService>(provider => new LocalCvFileStorageService(cvFolderPath));

// Register MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<UploadCvHandler>());


builder.Services.AddScoped<ILocalCvFileStorageService>(provider => new LocalCvFileStorageService(cvFolderPath));

// Register the UserCvService
builder.Services.AddScoped<UserCvService>();

// Register MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<UploadCvHandler>());










// Register MediatR and scan for handlers in the Application assembly
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
   Assembly.GetAssembly(typeof(Intership.Application.Commands.CreateIntern.CreateInternCommandHandler))));

/*builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    Assembly.GetAssembly(typeof(CreateUserCommandHandler))));*/

/*builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    Assembly.GetAssembly(typeof(GetUserByIdQueryHandler))));*/

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    Assembly.GetAssembly(typeof(GetSummaryQueryHandler)),
    Assembly.GetAssembly(typeof(AddCandidateCommandHandler)),
    Assembly.GetAssembly(typeof(GetAllCandidatesQueryHandler)),
    Assembly.GetAssembly(typeof(CreateRecruitmentSessionCommandHandler)),
    Assembly.GetAssembly(typeof(GetAllRecruitmentSessionsQueryHandler))
));

builder.Services.AddControllers();
//builder.Services.AddControllersWithViews();  // Register MVC services for views
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
app.UseStaticFiles(); // Serve React static files
app.UseRouting();
app.UseCors("AllowFrontend"); // Apply CORS policy
app.UseAuthentication(); // Add Authentication middleware
app.UseAuthorization(); // Add Authorization middleware

// React fallback middleware
app.Use(async (context, next) =>
{
    if (!context.Request.Path.Value.StartsWith("/api") &&
        !System.IO.Path.HasExtension(context.Request.Path.Value))
    {
        context.Request.Path = "/index.html";
    }

    await next();
});







app.UseStaticFiles(); // Ensure React files are served correctly
app.MapControllers();
app.Run();



