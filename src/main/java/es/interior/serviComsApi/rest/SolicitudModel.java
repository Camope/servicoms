package es.interior.serviComsApi.rest;

import java.util.Date;

import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(itemRelation = "solicitud", collectionRelation = "listaSolicitudes") // define la etiqueta después de _embedded para el usuario retornado
public class SolicitudModel extends RepresentationModel<SolicitudModel> {

	private Date fechaSolicitud;

	public Date getFechaSolicitud() {
		return fechaSolicitud;
	}

	public void setFechaSolicitud(Date fechaSolicitud) {
		this.fechaSolicitud = fechaSolicitud;
	}

	@Override
	public String toString() {
		return "SolicitudModel [fechaSolicitud=" + fechaSolicitud + "]";
	}

}
