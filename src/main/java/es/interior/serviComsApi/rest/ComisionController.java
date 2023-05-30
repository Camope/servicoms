package es.interior.serviComsApi.rest;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Date;


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

import es.interior.serviComsApi.ServiComsApiApplication;
import es.interior.serviComsApi.entidades.ComisionApi;
import es.interior.serviComsApi.entidades.ComisionApi.Tipo;
import es.interior.serviComsApi.excepciones.RegisterNotFoundException;
import es.interior.serviComsApi.repositorios.ComisionRepositorio;

@RestController
@RequestMapping("/comisiones")
public class ComisionController {

	private final ComisionRepositorio repositorio;
	private final ComisionAssembler assembler;
	private final ComisionListaAssembler listaAssembler;
	private final Logger log;

	ComisionController(ComisionRepositorio repositorio, ComisionAssembler assembler,
			ComisionListaAssembler listaAssembler) {

		this.repositorio = repositorio;
		this.assembler = assembler;
		this.listaAssembler = listaAssembler;

		log = ServiComsApiApplication.log;
	}

	@GetMapping("{id}")
	public ComisionModel getOne(@PathVariable Long id) {
		ComisionApi comision = repositorio.findById(id)
				.orElseThrow(() -> new RegisterNotFoundException(id, "comision"));
		log.info("Recuperado " + comision);
		return assembler.toModel(comision);
	}

	@PutMapping("{id}")
	public ComisionModel edit(@PathVariable Long id, @RequestBody ComisionModel model) {
		int n_regs = 0;

		if (model.getTipo() == Tipo.EXTRANJERO) {
			n_regs = repositorio.update(model.getPuesto(), model.getLocalidad(), model.getEspecialidad(),
					model.getEmpleo(), model.getFechaLimite(), model.getDuracion(), model.getDetalles(), 'E',
					model.getPerfil(), null, id);

		} else if (model.getTipo() == Tipo.VIOGEN) {
			n_regs = repositorio.update(model.getPuesto(), model.getLocalidad(), model.getEspecialidad(),
					model.getEmpleo(), model.getFechaLimite(), model.getDuracion(), model.getDetalles(), 'V', null,
					model.getRiesgo(), id);
		} else {
			n_regs = repositorio.update(model.getPuesto(), model.getLocalidad(), model.getEspecialidad(),
					model.getEmpleo(), model.getFechaLimite(), model.getDuracion(), model.getDetalles(), null, null,
					null, id);
		}

		if (n_regs == 0) {
			throw new RegisterNotFoundException(id, "comision");
		}

		ComisionApi comision = repositorio.findById(id)
				.orElseThrow(() -> new RegisterNotFoundException(id, "comision"));

		log.info("Actualizado " + comision);
		return assembler.toModel(comision);
	}

	@DeleteMapping("{id}")
	public void delete(@PathVariable Long id) {
		log.info("Borrado comision " + id);
		repositorio.deleteById(id);
	}

	@GetMapping
	public CollectionModel<ComisionListaModel> all() {
		return listaAssembler.toCollection(repositorio.findAll())
				.add(linkTo(methodOn(ComisionController.class).all()).withSelfRel());
	}

	@PostMapping
	public ComisionModel add(@RequestBody ComisionModel model) {

		model.setFechaPublicacion(new Date());

		ComisionApi comision = repositorio.save(assembler.toEntity(model));

		log.info("Añadido " + comision);
		return assembler.toModel(comision);
	}


}
