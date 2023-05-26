package es.interior.serviComsApi.rest;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import es.interior.serviComsApi.entidades.UsuarioApi;




@Component
public class UsuarioListaAssembler implements RepresentationModelAssembler<UsuarioApi, UsuarioListaModel> {
	
	@Override
	public UsuarioListaModel toModel(UsuarioApi entity) {
		UsuarioListaModel model = new UsuarioListaModel();

		model.setNombre(entity.getNombre());
		model.setApellidos(entity.getApellidos());
		model.setTip(entity.getTip());
		model.setEmpleo(entity.getEmpleo());
		model.setEmail(entity.getEmail());

		model.add(linkTo(methodOn(UsuarioController.class).getOne(entity.getId())).withSelfRel());
		return model;
	}

	public CollectionModel<UsuarioListaModel> toCollection(List<UsuarioApi> lista) {
		CollectionModel<UsuarioListaModel> collection = CollectionModel
				.of(lista.stream().map(this::toModel).collect(Collectors.toList()));
		return collection;
	}
}

