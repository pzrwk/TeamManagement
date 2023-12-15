using System.ComponentModel.DataAnnotations;

namespace TeamManagement.Domain.Entities
{
    public class Member
    {
        public int Id { get; init; }
        
        public required string Name { get; set; }
        
        public required string Email { get; set; }
        
        public required string PhoneNumber { get; set; }
        
        public bool IsActive { get; set; } = false;

        public string? AvatarUrl { get; set; }
        
        public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    }
}
