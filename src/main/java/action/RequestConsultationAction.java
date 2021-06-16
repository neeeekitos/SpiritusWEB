package action;

import com.mycompany.spiritus.metier.model.Client;
import com.mycompany.spiritus.metier.model.Consultation;
import com.mycompany.spiritus.metier.model.Medium;
import com.mycompany.spiritus.metier.model.Person;
import com.mycompany.spiritus.metier.service.AccountService;
import com.mycompany.spiritus.metier.service.PlanningService;

import javax.servlet.http.HttpServletResponse;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class RequestConsultationAction extends Action {
    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {

        PlanningService planningService = new PlanningService();
        AccountService accountService = new AccountService();
        HttpSession session = request.getSession();

        Long mediumId = Long.parseLong(request.getParameter("mediumId"));

        Medium medium = planningService.getMedium(mediumId);
        Long clientId = (Long)session.getAttribute("personId");

        Client client = accountService.getClientById(clientId);
        if (client == null) {
            request.setAttribute("responseStatus", HttpServletResponse.SC_FORBIDDEN);
            request.setAttribute("message", "You are not authenticated");
            System.out.println("No client is authenticated");
        } else {
            Consultation consultation = planningService.consultationRequest(medium, client);
            request.setAttribute("responseStatus", HttpServletResponse.SC_OK);
            request.setAttribute("consultation", consultation);
        }

    }
}
