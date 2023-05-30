package es.interior.serviComsApi.rest;

import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(itemRelation = "comision", collectionRelation = "listaComisiones")
public class ComisionListaModel extends RepresentationModel<ComisionListaModel> {

	private String puesto;
	private String localidad;
	private String especialidad;
	private String empleo;
	private Long estado;

	public String getPuesto() {
		return puesto;
	}

	public void setPuesto(String puesto) {
		this.puesto = puesto;
	}

	public String getLocalidad() {
		return localidad;
	}

	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}

	public String getEspecialidad() {
		return especialidad;
	}

	public void setEspecialidad(String especialidad) {
		this.especialidad = especialidad;
	}

	public String getEmpleo() {
		return empleo;
	}

	public void setEmpleo(String empleo) {
		this.empleo = empleo;
	}

	public Long getEstado() {
		return estado;
	}

	public void setEstado(Long estado) {
		this.estado = estado;
	}

	@Override
	public String toString() {
		return "ComisionListaModel [puesto=" + puesto + ", localidad=" + localidad + ", especialidad=" + especialidad
				+ ", empleo=" + empleo + ", estado=" + estado + "]";
	}

}
