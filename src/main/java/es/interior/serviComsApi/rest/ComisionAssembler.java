package es.interior.serviComsApi.rest;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Date;

import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import es.interior.serviComsApi.entidades.ComisionApi;
import es.interior.serviComsApi.entidades.ComisionApi.Tipo;
import es.interior.serviComsApi.entidades.ComisionExtranjero;
import es.interior.serviComsApi.entidades.ComisionViogen;
import es.interior.serviComsApi.utils.Utilidades;


@Component
public class ComisionAssembler implements RepresentationModelAssembler<ComisionApi, ComisionModel> {

	@Override
	public ComisionModel toModel(ComisionApi entity) {
		ComisionModel model = new ComisionModel();

		model.setPuesto(entity.getPuesto());
		model.setLocalidad(entity.getLocalidad());
		model.setEspecialidad(entity.getEspecialidad());
		model.setEmpleo(entity.getEmpleo());
		model.setFechaPublicacion(entity.getFechaPublicacion());
		model.setFechaLimite(entity.getFechaLimite());
		model.setDuracion(entity.getDuracion());
		model.setDetalles(entity.getDetalles());
		model.setTipo(entity.getTipo());
		model.setPerfil(entity.getTipo() == Tipo.EXTRANJERO ? ((ComisionExtranjero)entity).getPerfil() : null);
		model.setRiesgo(entity.getTipo() == Tipo.VIOGEN ? ((ComisionViogen)entity).getRiesgo() : null);
		model.setEstado(Utilidades.msToDeadline(entity.getFechaLimite()));
		
		model.add(linkTo(methodOn(ComisionController.class).getOne(entity.getId())).withSelfRel());

		return model;
	}

	public ComisionApi toEntity(ComisionModel model) {
		
		ComisionApi comision = null;
		
		if (model.getTipo() == Tipo.EXTRANJERO) {
			ComisionExtranjero comisionExtranjero = new ComisionExtranjero();
			comisionExtranjero.setPerfil(model.getPerfil());
			comision = comisionExtranjero;
		} else if (model.getTipo() == Tipo.VIOGEN) {
			ComisionViogen comisionViogen = new ComisionViogen();
			comisionViogen.setRiesgo(model.getRiesgo());
			comision = comisionViogen;
		} else {
			comision = new ComisionApi();
		}
		
		comision.setPuesto(model.getPuesto());
		comision.setLocalidad(model.getLocalidad());
		comision.setEspecialidad(model.getEspecialidad());
		comision.setEmpleo(model.getEmpleo());
		comision.setFechaPublicacion(new Date());
		comision.setFechaLimite(model.getFechaLimite());
		comision.setDuracion(model.getDuracion());
		comision.setDetalles(model.getDetalles());

		return comision;
	}

}
