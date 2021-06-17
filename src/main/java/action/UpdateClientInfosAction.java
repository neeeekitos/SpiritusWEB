package action;

import com.mycompany.spiritus.metier.model.Client;
import com.mycompany.spiritus.metier.service.AccountService;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.http.HttpSession;

public class UpdateClientInfosAction extends Action {

    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {

        HttpSession session = request.getSession();
        Long sessionUserId = (Long) session.getAttribute("personId");

        try {
            AccountService accountService = new AccountService();
            Client clientUpdate = accountService.getClientById(sessionUserId);
            if (clientUpdate == null) {
                request.setAttribute("success", false);
                request.setAttribute("reason", "Client " + sessionUserId.toString() + "not found");
            } else {
                
                clientUpdate.setLastName(request.getParameter("lastname"));
                clientUpdate.setFirstName(request.getParameter("firstname"));
                clientUpdate.setPhone(request.getParameter("phone"));
                clientUpdate.setMail(request.getParameter("mail"));
                clientUpdate.setAddress(request.getParameter("address"));
                Date birthdate = new SimpleDateFormat("yyyy-MM-dd").parse(request.getParameter("birthdate"));

                clientUpdate.setBirthDate(birthdate);
                
                accountService.updateClientInfo(clientUpdate);

                request.setAttribute("success", true);
                session.setAttribute("personId", clientUpdate.getId());
            }
        } catch (ParseException ex) {
            request.setAttribute("success", false);
            request.setAttribute("reason", " Error while parsing the date");
        }

    }
}
