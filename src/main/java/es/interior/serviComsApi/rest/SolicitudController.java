package es.interior.serviComsApi.rest;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.slf4j.Logger;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.interior.serviComsApi.ServiComsApiApplication;
import es.interior.serviComsApi.entidades.SolicitudApi;
import es.interior.serviComsApi.excepciones.RegisterNotFoundException;
import es.interior.serviComsApi.repositorios.SolicitudRepositorio;


@RestController
@RequestMapping("/solicitudes")
public class SolicitudController {

	private final SolicitudRepositorio repositorio;
	private final SolicitudAssembler<SolicitudApi> assembler;
	private final Logger log;

	SolicitudController(SolicitudRepositorio repositorio, SolicitudAssembler<SolicitudApi> assembler) {
		
		this.repositorio = repositorio;
		this.assembler = assembler;
		
		log = ServiComsApiApplication.log;
	}

	@GetMapping("{id}")
	public SolicitudModel getOne(@PathVariable Long id) {
		SolicitudApi solicitud = repositorio.findById(id).orElseThrow(() -> new RegisterNotFoundException(id, "solicitud"));
		log.info("Recuperado " + solicitud);
		return assembler.toModel(solicitud);
	}

	@DeleteMapping("{id}")
	public void delete(@PathVariable Long id) {
		log.info("Borrado solicitud " + id);
		repositorio.deleteById(id);
	}

	@GetMapping
	public CollectionModel<SolicitudModel> all() {
		return assembler.toCollection(repositorio.findAll())
				.add(linkTo(methodOn(SolicitudController.class).all()).withSelfRel());
	}

	@PostMapping
	public SolicitudModel add(@RequestBody SolicitudPostModel model) {
		
		SolicitudApi solicitud = repositorio.save(assembler.toEntity(model));
		
		log.info("Añadido " + solicitud);
		return assembler.toModel(solicitud);
	}

}
