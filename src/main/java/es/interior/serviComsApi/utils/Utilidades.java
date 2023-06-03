package es.interior.serviComsApi.utils;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;

public class Utilidades {

	public static Long secToDeadline(OffsetDateTime deadlineDate) {
		return ChronoUnit.SECONDS.between(OffsetDateTime.now(), deadlineDate);
	}
}
