package action;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

public abstract class Action {
    public abstract void execute(HttpServletRequest request) throws ServletException, IOException;
}
