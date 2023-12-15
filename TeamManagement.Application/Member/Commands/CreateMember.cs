using System.ComponentModel.DataAnnotations;
using MediatR;

namespace TeamManagement.Application.Member.Commands;

public class CreateMember : IRequest<Domain.Entities.Member>
{
    [Required(ErrorMessage = $"{nameof(Name)} is required")]
    public required string Name { get; set; }

    [Required(ErrorMessage = $"{nameof(Email)} is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public required string Email { get; set; }
    
    [Required(ErrorMessage = $"{nameof(PhoneNumber)} is required")]
    [Phone(ErrorMessage = "Invalid phone number")]
    public required string PhoneNumber { get; set; }

    public bool IsActive { get; set; }

    public string AvatarUrl { get; set; } = string.Empty;
}