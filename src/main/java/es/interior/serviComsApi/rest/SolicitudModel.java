package es.interior.serviComsApi.rest;

import java.time.OffsetDateTime;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(itemRelation = "solicitud", collectionRelation = "listaSolicitudes") // define la etiqueta después de _embedded para el usuario retornado
public class SolicitudModel extends RepresentationModel<SolicitudModel> {

	private OffsetDateTime fechaSolicitud;

	public OffsetDateTime getFechaSolicitud() {
		return fechaSolicitud;
	}

	public void setFechaSolicitud(OffsetDateTime fechaSolicitud) {
		this.fechaSolicitud = fechaSolicitud;
	}

	@Override
	public String toString() {
		return "SolicitudModel [fechaSolicitud=" + fechaSolicitud + "]";
	}

}
