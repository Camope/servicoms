package es.interior.serviComsApi.entidades;

import es.interior.servicomsLib.SolicitudImpl;

public class SolicitudApi extends SolicitudImpl {

	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	@Override
	public String toString() {
		return "SolicitudImpl [id=" + id + ", getFechaSolicitud=";// + getFechaSolicitud() + "]";
	}
	
}
