package action;

import com.mycompany.spiritus.metier.model.Client;
import com.mycompany.spiritus.metier.model.Person;
import com.mycompany.spiritus.metier.service.AccountService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CreateAccountAction extends Action {


    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {

        HttpSession session = request.getSession();

        try {
            Date birthdate =new SimpleDateFormat("yyyy-MM-dd").parse(request.getParameter("birthdate"));

            Client client = new Client(
                    request.getParameter("lastname"),
                    request.getParameter("firstname"),
                    birthdate,
                    request.getParameter("phone"),
                    request.getParameter("mail"),
                    request.getParameter("password"),
                    request.getParameter("address")
            );

            AccountService accountService = new AccountService();
            Client clientResponse = accountService.createAccount(client);

            if (clientResponse == null) {
                request.setAttribute("success", false);
                request.setAttribute("reason", "Account already exists");
            } else {
                request.setAttribute("success", true);
                session.setAttribute("personId", clientResponse.getId());
            }
        } catch (ParseException ex) {
            request.setAttribute("success", false);
            request.setAttribute("reason", " Error while parsing the date");
        }

    }
}
