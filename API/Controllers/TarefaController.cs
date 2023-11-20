using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers;

[Route("api/tarefa")]
[ApiController]
public class TarefaController : ControllerBase
{
    private readonly AppDataContext _context;

    public TarefaController(AppDataContext context) =>
        _context = context;

    // GET: api/tarefa/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Tarefa> tarefas = _context.Tarefas.Include(x => x.Categoria).ToList();
            return Ok(tarefas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //get
    [HttpGet]
    [Route("listarnaoconcluidas")]
public IActionResult ListarNaoConcluidas()
{
    try
    {
        List<Tarefa> tarefasNaoConcluidas = _context.Tarefas
            .Where(x => x.Status == "Não iniciada" || x.Status == "Em andamento")
            .Include(x => x.Categoria)
            .ToList();

        return Ok(tarefasNaoConcluidas);
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
}

  //get
    [HttpGet]
    [Route("concluidas")]
public IActionResult ListarConcluidas()
{
    try
    {
        List<Tarefa> tarefasNaoConcluidas = _context.Tarefas
            .Where(x => x.Status == "Concluído")
            .Include(x => x.Categoria)
            .ToList();

        return Ok(tarefasNaoConcluidas);
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
}



    // POST: api/tarefa/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Tarefa tarefa)
    {
        try
        {
            Categoria? categoria = _context.Categorias.Find(tarefa.CategoriaId);
            if (categoria == null)
            {
                return NotFound();
            }
            tarefa.Categoria = categoria;
            _context.Tarefas.Add(tarefa);
            _context.SaveChanges();
            return Created("", tarefa);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

      // alterar
   [HttpPatch]
[Route("alterar/{id}")]
public IActionResult Atualizar([FromRoute] int id)
{
    try
    {
        Tarefa tarefaCadastrada = _context.Tarefas.FirstOrDefault(x => x.TarefaId == id);

        if (tarefaCadastrada == null)
        {
            return NotFound();
        }
        else
        {
            // Altera o status para "Concluído" se a tarefa estiver em andamento
            if (tarefaCadastrada.Status == "Em andamento")
            {
                tarefaCadastrada.Status = "Concluído";
            } else if(tarefaCadastrada.Status != "Concluído"){
                  tarefaCadastrada.Status = "Em andamento";
            }
            _context.Tarefas.Update(tarefaCadastrada);
            _context.SaveChanges();
            
            return Ok();
        }
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
}
}
