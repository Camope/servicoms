package es.interior.serviComsApi.rest;

import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import es.interior.serviComsApi.entidades.UsuarioApi.Role;


@Relation(itemRelation = "usuario") // define la etiqueta después de _embedded para el usuario retornado
public class UsuarioModel extends RepresentationModel<UsuarioModel> {

	private String nombre;
	private String apellidos;
	private String tip;
	private String empleo;
	private String email;
	private Role role;

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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "UsuarioModel [nombre=" + nombre + ", apellidos=" + apellidos + ", tip=" + tip + ", empleo=" + empleo
				+ ", email=" + email + ", role=" + role + "]";
	}

}
