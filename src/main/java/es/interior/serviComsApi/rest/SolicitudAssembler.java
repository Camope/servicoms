package es.interior.serviComsApi.rest;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import es.interior.serviComsApi.entidades.ComisionApi;
import es.interior.serviComsApi.entidades.SolicitudApi;
import es.interior.serviComsApi.entidades.UsuarioApi;
import es.interior.servicomsLib.Solicitud;


@Component
public class SolicitudAssembler <T extends Solicitud> implements RepresentationModelAssembler<T, SolicitudModel> {

	@Override
	public SolicitudModel toModel(T entity) {
		SolicitudModel model = new SolicitudModel();
		
		model.setFechaSolicitud(entity.getFechaSolicitud());

		model.add(linkTo(methodOn(ComisionController.class).getOne(((ComisionApi) entity.getComision()).getId()))
				.withRel("comision"));
		model.add(linkTo(methodOn(UsuarioController.class).getOne(((UsuarioApi) entity.getUsuario()).getId()))
				.withRel("usuario"));
		model.add(linkTo(methodOn(SolicitudController.class).getOne(((SolicitudApi) entity).getId()))
				.withSelfRel());

		return model;
	}

	public SolicitudApi toEntity(SolicitudPostModel model) {

		SolicitudApi solicitud = new SolicitudApi();

		solicitud.setFechaSolicitud(new Date());
		solicitud.setComision(model.getComision());
		solicitud.setUsuario(model.getUsuario());

		return solicitud;
	}

	public CollectionModel<SolicitudModel> toCollection(List<T> lista) {
		CollectionModel<SolicitudModel> collection = CollectionModel
				.of(lista.stream().map(this::toModel).collect(Collectors.toList()));
		return collection;
	}

}
