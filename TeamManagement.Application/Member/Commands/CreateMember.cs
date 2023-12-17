using System.ComponentModel.DataAnnotations;
using MediatR;

namespace TeamManagement.Application.Member.Commands;

public class CreateMember : IRequest<Domain.Entities.Member>
{
    [Required(ErrorMessage = $"Pole nazwa jest wymagane")]
    public required string Name { get; set; }

    [Required(ErrorMessage = $"Pole adres email jest wymagane")]
    [EmailAddress(ErrorMessage = "Niepoprawny adres email")]
    public required string Email { get; set; }
    
    [Required(ErrorMessage = $"Pole numer telefonu jest wymagane")]
    [Phone(ErrorMessage = "Niepoprawny numer telefonu")]
    public required string PhoneNumber { get; set; }

    public bool IsActive { get; set; }

    public string AvatarUrl { get; set; } = string.Empty;
}