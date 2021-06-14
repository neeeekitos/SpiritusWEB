package action;

import com.mycompany.spiritus.metier.model.Client;
import com.mycompany.spiritus.metier.model.Consultation;
import com.mycompany.spiritus.metier.model.Person;
import com.mycompany.spiritus.metier.service.AccountService;
import com.mycompany.spiritus.metier.service.PlanningService;
import sun.tools.jconsole.JConsole;

import javax.json.JsonArray;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

public class GetClientHomePageInfosAction extends Action {
    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {
        HttpSession session = request.getSession(true);
        AccountService accountService = new AccountService();
        PlanningService planningService = new PlanningService();

        Long sessionUserId = (Long)session.getAttribute("personId");

        System.out.println("session is new ? " + session.isNew());

        if (sessionUserId != null) {
            Person person = accountService.getClientById(sessionUserId);
            if (! (person instanceof Client)) {
                System.out.println("error, no client found");
                request.setAttribute("success", false);
            } else {

                Client client = (Client) person;
                request.setAttribute("success", true);
                request.setAttribute("id", client.getId());
                request.setAttribute("zodiacSign", client.getZodiacSign());
                request.setAttribute("chineeseAstralSign", client.getChineseAstroSign());
                request.setAttribute("luckyColor", client.getColor());
                request.setAttribute("totemAnimal", client.getTotemAnimal());
                request.setAttribute("firstName", client.getFirstName());
                request.setAttribute("lastName", client.getLastName());

                List<Consultation> consHistory = planningService.getClientConsultationHistory(client);
                request.setAttribute("consultationList", consHistory);

            }
        } else {
            System.out.println("not connected");
        }

    }
}
