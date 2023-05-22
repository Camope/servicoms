package es.interior.serviComsApi.entidades;

import es.interior.servicomsLib.Extranjero;

public class ComisionExtranjero extends ComisionApi implements Extranjero {
	
	private String perfil;

	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}

	public Tipo getTipo() {
		return Tipo.EXTRANJERO;
	}
	
	@Override
	public String toString() {
		return "ComisionExtrajero [perfil=" + perfil + ", Info=" + super.toString() + "]";
	}

}
