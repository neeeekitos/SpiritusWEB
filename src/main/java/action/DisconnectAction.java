package action;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

import static javax.servlet.http.HttpServletResponse.SC_OK;

public class DisconnectAction extends Action {

    public void execute(HttpServletRequest request) throws ServletException, IOException {

        HttpSession session = request.getSession(true);
        //TO DO check to remove user from session
        session.invalidate();
        request.setAttribute("status", SC_OK);

    }

}
