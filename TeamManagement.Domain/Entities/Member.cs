using System.ComponentModel.DataAnnotations;

namespace TeamManagement.Domain.Entities
{
    public class Member
    {
        public int Id { get; init; }
        
        public string Name { get; set; }
        
        public string Email { get; set; }
        
        public string PhoneNumber { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    }
}
