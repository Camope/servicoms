package es.interior.serviComsApi.entidades;

import es.interior.servicomsLib.ComisionImpl;

public class ComisionApi extends ComisionImpl {

	public enum Tipo {
		EXTRANJERO,
		VIOGEN
	}
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Tipo getTipo() {
		return null;
	}

	@Override
	public String toString() {
		return "Comision (id: " + id + "): [puesto=" + getPuesto() + ", localidad=" + getLocalidad() + ", especialidad=" + getEspecialidad()
				+ ", empleo=" + getEmpleo() + ", fechaPublicacion=" + getFechaPublicacion() + ", fechaLimite=" + getFechaLimite()
				+ ", duracion=" + getDuracion() + "]";
	}
}
