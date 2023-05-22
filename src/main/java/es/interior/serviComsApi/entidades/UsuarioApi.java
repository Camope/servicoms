package es.interior.serviComsApi.entidades;

import es.interior.servicomsLib.UsuarioImpl;

public class UsuarioApi extends UsuarioImpl {

	public enum Role {
		ADMIN, NO_ADMIN
	}

	private Long id;
	private Role role;
	private String password;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "UsuarioImpl [id=" + id + ", role=" + role + ", Info="
				+ super.toString() + "]";
	}

	
}
