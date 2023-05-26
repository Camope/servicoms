package es.interior.serviComsApi.rest;

import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "listaUsuarios") // define la etiqueta después de _embedded para el usuario retornado
public class UsuarioListaModel extends RepresentationModel<UsuarioListaModel> {

	private String nombre;
	private String apellidos;
	private String tip;
	private String empleo;
	private String email;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public String getEmpleo() {
		return empleo;
	}

	public void setEmpleo(String empleo) {
		this.empleo = empleo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "UsuarioListaModel [nombre=" + nombre + ", apellidos=" + apellidos + ", tip=" + tip + ", empleo=" + empleo
				+ ", email=" + email + "]";
	}

}
