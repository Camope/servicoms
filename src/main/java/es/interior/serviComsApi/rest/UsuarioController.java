package es.interior.serviComsApi.rest;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.interior.serviComsApi.entidades.ComisionApi;
import es.interior.serviComsApi.ServiComsApiApplication;
import es.interior.serviComsApi.entidades.UsuarioApi;
import es.interior.serviComsApi.excepciones.RegisterNotFoundException;
import es.interior.serviComsApi.repositorios.UsuarioRepositorio;
import es.interior.servicomsLib.Solicitud;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

	private final UsuarioRepositorio repositorio;
	private final UsuarioAssembler assembler;
	private final UsuarioListaAssembler listaAssembler;
	private final SolicitudAssembler<Solicitud> solicitudAssembler;
	private final ComisionListaAssembler comisionListaAssembler;
	private final Logger log;

	UsuarioController(UsuarioRepositorio repositorio, UsuarioAssembler assembler, UsuarioListaAssembler listaAssembler,
			SolicitudAssembler<Solicitud> solicitudAssembler, ComisionListaAssembler comisionListaAssembler) {

		this.repositorio = repositorio;
		this.assembler = assembler;
		this.listaAssembler = listaAssembler;
		this.solicitudAssembler = solicitudAssembler;
		this.comisionListaAssembler = comisionListaAssembler;

		log = ServiComsApiApplication.log;
	}


	@GetMapping("{id}")
	public UsuarioModel getOne(@PathVariable Long id) {
		UsuarioApi usuario = repositorio.findById(id).orElseThrow(() -> new RegisterNotFoundException(id, "usuario"));
		log.info("Recuperado " + usuario);
		return assembler.toModel(usuario);
	}

	@PutMapping("{id}")
	public UsuarioModel edit(@PathVariable Long id, @RequestBody UsuarioModel model) {
		UsuarioApi usuario = repositorio.findById(id).map(u -> {

			u.setNombre(model.getNombre());
			u.setApellidos(model.getApellidos());
			u.setTip(model.getTip());
			u.setEmpleo(model.getEmpleo());
			u.setEmail(model.getEmail());
			u.setRole(model.getRole());

			return repositorio.save(u);
		}).orElseThrow(() -> new RegisterNotFoundException(id, "usuario"));
		log.info("Actualizado " + usuario);
		return assembler.toModel(usuario);
	}

	@DeleteMapping("{id}")
	public void delete(@PathVariable Long id) {
		log.info("Borrado usuario " + id);
		repositorio.deleteById(id);
	}

	@GetMapping
	public CollectionModel<UsuarioListaModel> all() {
		return listaAssembler.toCollection(repositorio.findAll())
				.add(linkTo(methodOn(UsuarioController.class).all()).withSelfRel());
	}

	@PostMapping
	public UsuarioModel add(@RequestBody UsuarioPostModel model) {

		UsuarioApi usuario = repositorio.save(assembler.toEntity(model));

		log.info("Añadido " + usuario);
		return assembler.toModel(usuario);
	}

	@GetMapping("{id}/solicitudes")
	public CollectionModel<SolicitudModel> getSolicitudes(@PathVariable Long id) {
		List<Solicitud> solicitudes = repositorio.findById(id)
				.orElseThrow(() -> new RegisterNotFoundException(id, "usuario")).getSolicitudes();

		return solicitudAssembler.toCollection(solicitudes).add(linkTo(methodOn(UsuarioController.class).getOne(id))
				.slash("solicitudes").withSelfRel());
	}

	@GetMapping("{id}/comisiones")
	public CollectionModel<ComisionListaModel> getComisiones(@PathVariable Long id) {

		List<ComisionApi> comisiones = repositorio.findById(id)
				.orElseThrow(() -> new RegisterNotFoundException(id, "usuario")).getSolicitudes().stream()
				.map(c -> (ComisionApi) c.getComision()).collect(Collectors.toList());

		return comisionListaAssembler.toCollection(comisiones).add(
				linkTo(methodOn(UsuarioController.class).getOne(id)).slash("comisiones").withSelfRel());
	}

//	@PatchMapping("{id}/password")
//	public void passChange(@PathVariable Long id, @Valid @RequestBody String password) {
//
//		Usuario usuarioActualizado = repositorio.findById(id).map(u -> {
//			u.setPassword(new BCryptPasswordEncoder().encode(password));
//			return repositorio.save(u);
//		}).orElseThrow(() -> new RegisterNotFoundException(id, "usuario"));
//		
//		log.info("Cambiada la contraseña del usuario " + usuarioActualizado);
//	}

}
