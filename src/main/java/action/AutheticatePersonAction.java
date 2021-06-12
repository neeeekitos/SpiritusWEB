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

public class AutheticatePersonAction extends Action {

    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {

        HttpSession session = request.getSession(true);
        request.setCharacterEncoding("UTF-8");
        // Récupération des Paramètres de la Requête
        String login = request.getParameter("login");
        String password = request.getParameter("password");

        // Instanciation de la classe de Service
        AccountService service = (AccountService) ServiceFactory.buildService("HR");
        Person person = service.authenticatePerson(login, password);

        request.setAttribute("person", person);
    }
}
