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

        try {

            Long mediumId = Long.parseLong(request.getParameter("mediumId"));

            Medium medium = planningService.getMedium(mediumId);
            Long clientId = (Long)session.getAttribute("personId");

            if (clientId == null || accountService.getClientById(clientId) == null) {
                request.setAttribute("status", HttpServletResponse.SC_FORBIDDEN);
                request.setAttribute("message", "You are not authenticated");
                System.out.println("No client is authenticated");
            } else {
                Client client = accountService.getClientById(clientId);
                Consultation consultation = planningService.getClientCurrentConsultation(client);
                System.out.println("the consultation : " + consultation);
                if (consultation != null) {
                    request.setAttribute("status", HttpServletResponse.SC_CONFLICT);
                    request.setAttribute("message", "There is already a pending consultation of the client");
                } else {
                    consultation = planningService.consultationRequest(medium, client);
                    request.setAttribute("status", HttpServletResponse.SC_OK);
                    request.setAttribute("consultation", consultation);
                }
            }
        } catch (NumberFormatException ex) {
            request.setAttribute("status", HttpServletResponse.SC_BAD_REQUEST);
            request.setAttribute("message", "mediumId parameter is missing");
        }

    }
}
