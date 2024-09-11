package PTTKHT_BackEnd.Configuration.Exception;

import org.springframework.security.core.AuthenticationException;

public class GlobalBanException extends AuthenticationException {
    public GlobalBanException(String msg) {
        super(msg);
    }
}
