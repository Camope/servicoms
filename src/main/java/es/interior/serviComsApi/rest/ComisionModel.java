package es.interior.serviComsApi.rest;

import java.time.OffsetDateTime;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import es.interior.serviComsApi.entidades.ComisionApi.Tipo;


@Relation(value = "comision")
public class ComisionModel extends RepresentationModel<ComisionModel> {

	private String puesto;
	private String localidad;
	private String especialidad;
	private String empleo;
	private OffsetDateTime fechaPublicacion;
	private OffsetDateTime fechaLimite;
	private Integer duracion;
	private String detalles;
	private Tipo tipo;
	private String perfil;
	private String riesgo;
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

	public OffsetDateTime getFechaPublicacion() {
		return fechaPublicacion;
	}

	public void setFechaPublicacion(OffsetDateTime fechaPublicacion) {
		this.fechaPublicacion = fechaPublicacion;
	}

	public OffsetDateTime getFechaLimite() {
		return fechaLimite;
	}

	public void setFechaLimite(OffsetDateTime fechaLimite) {
		this.fechaLimite = fechaLimite;
	}

	public Integer getDuracion() {
		return duracion;
	}

	public void setDuracion(Integer duracion) {
		this.duracion = duracion;
	}

	public String getDetalles() {
		return detalles;
	}

	public void setDetalles(String detalles) {
		this.detalles = detalles;
	}

	public Tipo getTipo() {
		return tipo;
	}

	public void setTipo(Tipo tipo) {
		this.tipo = tipo;
	}

	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}

	public String getRiesgo() {
		return riesgo;
	}

	public void setRiesgo(String riesgo) {
		this.riesgo = riesgo;
	}

	public Long getEstado() {
		return estado;
	}

	public void setEstado(Long estado) {
		this.estado = estado;
	}

	@Override
	public String toString() {
		return "ComisionModel [puesto=" + puesto + ", localidad=" + localidad + ", especialidad=" + especialidad
				+ ", empleo=" + empleo + ", fechaPublicacion=" + fechaPublicacion + ", fechaLimite=" + fechaLimite
				+ ", duracion=" + duracion + ", detalles=" + detalles + ", tipo=" + tipo + ", perfil=" + perfil
				+ ", riesgo=" + riesgo + ", estado=" + estado + "]";
	}

}
