package es.interior.serviComsApi.rest;

import java.util.List;

import es.interior.serviComsApi.entidades.ComisionApi;


public class EstadisticaModel {
	
	private Double duracionMedia;

	public EstadisticaModel(List<ComisionApi> comisiones) {
		super();
		this.duracionMedia = calculaDuracionMedia(comisiones);
	}

	public Double getDuracionMedia() {
		return duracionMedia;
	}

	public void setDuracionMedia(Double duracionMedia) {
		this.duracionMedia = duracionMedia;
	}
	
	public Double calculaDuracionMedia(List<ComisionApi> comisiones) {
		double media = 0;

		for (ComisionApi c : comisiones) {
			media += c.getDuracion();
		}
		media /= comisiones.size();
		
		return media;
	}

	@Override
	public String toString() {
		return "EstadisticaModel [duracionMedia=" + duracionMedia + "]";
	}
	
}
