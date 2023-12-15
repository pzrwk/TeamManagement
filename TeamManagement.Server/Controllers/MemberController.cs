using MediatR;
using Microsoft.AspNetCore.Mvc;
using TeamManagement.Application.Member.Commands;
using TeamManagement.Application.Member.Queries;

namespace TeamManagement.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class MemberController : ControllerBase
{
    private readonly IMediator _mediator;

    public MemberController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetMemberById(int id)
    {
        var query = new GetMemberById { Id = id };
        var member = await _mediator.Send(query);
        
        if (member == null)
            return NotFound($"Member with id {id} not found");

        return Ok(member);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllMembers()
    {
        var query = new GetAllMembers();
        var members = await _mediator.Send(query);

        if (!members.Any())
            return NotFound("List is empty");

        return Ok(members);
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateMember(CreateMember member)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var result = await _mediator.Send(member);

        return Ok(result);
    }

    [HttpPatch]
    public async Task<IActionResult> UpdateMember(UpdateMember command)
    {
        var result = await _mediator.Send(command);

        if(result == null)
            return BadRequest($"Member with id {command.Id} not found or status is already set");
        
        return Ok(result);
    }
}