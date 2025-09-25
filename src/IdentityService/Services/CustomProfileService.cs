using System.Security.Claims;
using System.Linq;
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
                new Claim("username", user.UserName ?? string.Empty),
                new Claim("user_id", user.Id),
                new Claim(JwtClaimTypes.Subject, user.Id),
                new Claim(JwtClaimTypes.PreferredUserName, user.UserName ?? string.Empty)
            };

            if (!string.IsNullOrEmpty(user.Email))
            {
                claims.Add(new Claim(JwtClaimTypes.Email, user.Email));
            }

            // Add name claim: prefer persisted, fallback to username
            var nameClaim = existingClaims.FirstOrDefault(c => c.Type == JwtClaimTypes.Name);
            if (nameClaim != null)
            {
                claims.Add(nameClaim);
            }
            else if (!string.IsNullOrEmpty(user.UserName))
            {
                claims.Add(new Claim(JwtClaimTypes.Name, user.UserName));
            }

            // Add any other persisted claims
            foreach (var c in existingClaims)
            {
                if (!claims.Any(x => x.Type == c.Type && x.Value == c.Value))
                    claims.Add(c);
            }

            context.IssuedClaims.AddRange(claims);
        }
        
        public async Task IsActiveAsync(IsActiveContext context)
        {
            var user = await _userManager.GetUserAsync(context.Subject);
            context.IsActive = user != null;
        }
    }
}
