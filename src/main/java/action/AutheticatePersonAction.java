package action;

import action.Action;
import com.mycompany.spiritus.metier.model.Person;
import com.mycompany.spiritus.metier.service.AccountService;
import com.mycompany.spiritus.metier.service.Service;
import com.mycompany.spiritus.metier.service.ServiceFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOError;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import static javax.servlet.http.HttpServletResponse.*;

public class AutheticatePersonAction extends Action {

    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {

        HttpSession session = request.getSession(false);
        request.setCharacterEncoding("UTF-8");

        // check if user has been already connected
        if (session != null) {
            request.setAttribute("status", SC_FORBIDDEN);
            return;
        }


        String login = request.getParameter("login");
        String password = request.getParameter("password");

        // Fetching user account
        AccountService service = (AccountService) ServiceFactory.buildService("HR");
        Person person = service.authenticatePerson(login, password);

        if (person != null) {
            request.setAttribute("person", person);
            request.setAttribute("status", SC_OK);
            session = request.getSession(true);
            session.setAttribute("user", person.getId());
        } else {
            request.setAttribute("status", SC_UNAUTHORIZED);
            System.out.println("Invalid user's credentials");
        }
    }
}
