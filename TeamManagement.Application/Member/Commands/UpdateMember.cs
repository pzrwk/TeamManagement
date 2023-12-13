﻿using System.ComponentModel.DataAnnotations;
using MediatR;

namespace TeamManagement.Application.Member.Commands;

public class UpdateMember : IRequest<Domain.Entities.Member>
{
    [Required(ErrorMessage = $"{nameof(Id)} is required")]
    public int Id { get; set; }
    
    [Required(ErrorMessage = $"{nameof(Name)} is required")]
    public string Name { get; set; }
    
    [Required(ErrorMessage = $"{nameof(Email)} is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; }
    
    [Required(ErrorMessage = $"{nameof(PhoneNumber)} is required")]
    [Phone(ErrorMessage = "Invalid phone number")]
    public string PhoneNumber { get; set; }
    
    [Required(ErrorMessage = $"{nameof(IsActive)} is required")]
    public bool IsActive { get; set; }
}