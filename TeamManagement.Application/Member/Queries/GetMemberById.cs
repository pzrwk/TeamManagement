using System.ComponentModel.DataAnnotations;
using MediatR;

namespace TeamManagement.Application.Member.Queries;

public class GetMemberById : IRequest<Domain.Entities.Member>
{
    [Required(ErrorMessage = $"{nameof(Id)} is required")]
    public int Id { get; set; }
}