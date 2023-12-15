using System.ComponentModel.DataAnnotations;
using MediatR;

namespace TeamManagement.Application.Member.Commands;

public class UpdateMember : IRequest<Domain.Entities.Member>
{
    [Required(ErrorMessage = $"{nameof(Id)} is required")]
    public int Id { get; set; }
    
    public string? Name { get; set; }
    
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string? Email { get; set; }
    
    [Phone(ErrorMessage = "Invalid phone number")]
    public string? PhoneNumber { get; set; }
    
    public bool? IsActive { get; set; }
}