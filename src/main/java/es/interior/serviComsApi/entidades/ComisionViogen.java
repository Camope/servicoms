package es.interior.serviComsApi.entidades;

import es.interior.servicomsLib.Viogen;

public class ComisionViogen extends ComisionApi implements Viogen {

	private String riesgo;

	public String getRiesgo() {
		return riesgo;
	}

	public void setRiesgo(String riesgo) {
		this.riesgo = riesgo;
	}

	public Tipo getTipo() {
		return Tipo.VIOGEN;
	}
	
	@Override
	public String toString() {
		return "ComisionViogen [riesgo=" + riesgo + ", Info=" + super.toString() + "]";
	}
	
	
}
