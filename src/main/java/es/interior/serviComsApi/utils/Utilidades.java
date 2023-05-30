package es.interior.serviComsApi.utils;

import java.util.Date;

public class Utilidades {

//	public static final Long UMBRAL_ESTADO = 7l;  
//	public static final Long UMBRAL_ESTADO_MS = UMBRAL_ESTADO * 24 * 3600 * 1000;
	
	public static Long msToDeadline(Date deadlineDate) {
		return deadlineDate.getTime() - System.currentTimeMillis();
	}
}
