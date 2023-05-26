package es.interior.serviComsApi.rest;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import es.interior.serviComsApi.entidades.UsuarioApi;


@Component
public class UsuarioAssembler implements RepresentationModelAssembler<UsuarioApi, UsuarioModel> {

	@Override
	public UsuarioModel toModel(UsuarioApi entity) {
		UsuarioModel model = new UsuarioModel();

		model.setNombre(entity.getNombre());
		model.setApellidos(entity.getApellidos());
		model.setTip(entity.getTip());
		model.setEmpleo(entity.getEmpleo());
		model.setEmail(entity.getEmail());
		model.setRole(entity.getRole());
		
		model.add(linkTo(methodOn(UsuarioController.class).getOne(entity.getId())).withSelfRel());

		return model;
	}

	public UsuarioApi toEntity(UsuarioPostModel model) {
		
		UsuarioApi usuario = toEntity((UsuarioModel)model);
		
		usuario.setPassword(model.getPassword());

		return usuario;
	}
	
	public UsuarioApi toEntity(UsuarioModel model) {
		
		UsuarioApi usuario = new UsuarioApi();
		
		usuario.setNombre(model.getNombre());
		usuario.setApellidos(model.getApellidos());
		usuario.setTip(model.getTip());
		usuario.setEmpleo(model.getEmpleo());
		usuario.setEmail(model.getEmail());
		usuario.setRole(model.getRole());

		return usuario;
	}

}
