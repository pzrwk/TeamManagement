using System.ComponentModel.DataAnnotations;
using MediatR;

namespace TeamManagement.Application.Member.Commands;

public class ChangeMemberStatus : IRequest<Domain.Entities.Member>
{
    [Required]
    public int Id { get; set; }
    [Required]
    public bool IsActive { get; set; }
}