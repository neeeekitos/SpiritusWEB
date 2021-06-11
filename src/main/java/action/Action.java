package action;

import javax.servlet.http.HttpServletRequest;

public abstract class Action {
    public abstract void execute(HttpServletRequest request);
}
