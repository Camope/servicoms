package es.interior.serviComsApi.rest;

import java.util.Date;

import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import es.interior.serviComsApi.entidades.ComisionApi;
import es.interior.serviComsApi.entidades.UsuarioApi;

@Relation(itemRelation = "solicitud") // define la etiqueta después de _embedded para el usuario retornado
public class SolicitudPostModel extends RepresentationModel<SolicitudPostModel> {

	private Date fechaSolicitud;
	private ComisionApi comision;
	private UsuarioApi usuario;

	public Date getFechaSolicitud() {
		return fechaSolicitud;
	}

	public void setFechaSolicitud(Date fechaSolicitud) {
		this.fechaSolicitud = fechaSolicitud;
	}

	public ComisionApi getComision() {
		return comision;
	}

	public void setComision(ComisionApi comision) {
		this.comision = comision;
	}

	public UsuarioApi getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioApi usuario) {
		this.usuario = usuario;
	}

	@Override
	public String toString() {
		return "SolicitudPostModel [fechaSolicitud=" + fechaSolicitud + ", comision=" + comision + ", Usuario="
				+ usuario + "]";
	}
	
}
