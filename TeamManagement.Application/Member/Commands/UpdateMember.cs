using System.ComponentModel.DataAnnotations;
using MediatR;

namespace TeamManagement.Application.Member.Commands;

public class UpdateMember : IRequest<Domain.Entities.Member>
{
    [Required(ErrorMessage = $"Pole Id jest wymagane")]
    public int Id { get; set; }
    
    public string? Name { get; set; }
    
    [EmailAddress(ErrorMessage = "Niepoprawny adres email")]
    public string? Email { get; set; }
    
    [Phone(ErrorMessage = "Niepoprawny numer telefonu")]
    public string? PhoneNumber { get; set; }
    
    public bool? IsActive { get; set; }
}