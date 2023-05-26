package es.interior.serviComsApi.rest;

import org.springframework.hateoas.server.core.Relation;

@Relation(itemRelation = "usuario") // define la etiqueta después de _embedded para el usuario retornado
public class UsuarioPostModel extends UsuarioModel {

	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
