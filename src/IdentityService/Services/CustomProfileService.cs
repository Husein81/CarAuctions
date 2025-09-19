using System.Security.Claims;
using Duende.IdentityModel;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services
{
    public class CustomProfileService : IProfileService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public CustomProfileService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = await _userManager.GetUserAsync(context.Subject);
            if (user == null) return;

            var existingClaims = await _userManager.GetClaimsAsync(user);

            var claims = new List<Claim>
            {
                new Claim("user_id", user.Id),
                new Claim(JwtClaimTypes.Subject, user.Id),
                new Claim(JwtClaimTypes.PreferredUserName, user.UserName ?? string.Empty),
                new Claim("username", user.UserName ?? string.Empty)
            };

            if (!string.IsNullOrEmpty(user.Email))
            {
                claims.Add(new Claim(JwtClaimTypes.Email, user.Email));
            }

            context.IssuedClaims.AddRange(claims);
            
            // Add existing name claim if it exists
            var nameClaim = existingClaims.FirstOrDefault(x => x.Type == JwtClaimTypes.Name);
            if (nameClaim != null)
            {
                context.IssuedClaims.Add(nameClaim);
            }
            else if (!string.IsNullOrEmpty(user.UserName))
            {
                context.IssuedClaims.Add(new Claim(JwtClaimTypes.Name, user.UserName));
            }
        }
        
        public async Task IsActiveAsync(IsActiveContext context)
        {
            var user = await _userManager.GetUserAsync(context.Subject);
            context.IsActive = user != null;
        }
    }
}
