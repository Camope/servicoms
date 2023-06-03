package es.interior.serviComsApi.rest;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import es.interior.serviComsApi.entidades.ComisionApi;
import es.interior.serviComsApi.utils.Utilidades;



@Component
public class ComisionListaAssembler implements RepresentationModelAssembler<ComisionApi, ComisionListaModel> {
	
	@Override
	public ComisionListaModel toModel(ComisionApi entity) {
		ComisionListaModel model = new ComisionListaModel();

		model.setPuesto(entity.getPuesto());
		model.setLocalidad(entity.getLocalidad());
		model.setEspecialidad(entity.getEspecialidad());
		model.setEmpleo(entity.getEmpleo());
		model.setEstado(Utilidades.secToDeadline(entity.getFechaLimite()));

		model.add(linkTo(methodOn(ComisionController.class).getOne(entity.getId())).withSelfRel());
		return model;
	}

	public CollectionModel<ComisionListaModel> toCollection(List<ComisionApi> lista) {
		CollectionModel<ComisionListaModel> collection = CollectionModel
				.of(lista.stream().map(this::toModel).collect(Collectors.toList()));
		return collection;
	}
}

