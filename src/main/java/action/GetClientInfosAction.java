package action;

import com.mycompany.spiritus.metier.model.Client;
import com.mycompany.spiritus.metier.service.AccountService;
import com.mycompany.spiritus.metier.service.PlanningService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;

public class GetClientInfosAction extends Action{
    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {
        HttpSession session = request.getSession(true);
        AccountService accountService = new AccountService();
        PlanningService planningService = new PlanningService();
        try {
            Long clientId = Long.parseLong(request.getParameter("clientId"));
            Client client = accountService.getClientById(clientId);
            if (client == null) {
                request.setAttribute("status", HttpServletResponse.SC_NOT_FOUND);
                request.setAttribute("message", "Client not found");
            } else {
                request.setAttribute("status", HttpServletResponse.SC_OK);
                request.setAttribute("id", client.getId());
                request.setAttribute("lastName", client.getLastName());
                request.setAttribute("firstName", client.getFirstName());
                request.setAttribute("phone", client.getPhone());
                request.setAttribute("mail", client.getMail());
                request.setAttribute("address", client.getAddress());
                request.setAttribute("totemAnimal", client.getTotemAnimal());
                request.setAttribute("zodiacSign", client.getZodiacSign());
                request.setAttribute("chineeseAstralSign", client.getChineseAstroSign());
                request.setAttribute("color", client.getColor());
                request.setAttribute("birthDate", client.getBirthDate());
            }

        } catch (NumberFormatException ex) {
            request.setAttribute("status", HttpServletResponse.SC_BAD_REQUEST);
            request.setAttribute("message", "clientId is in bad format");
        }

    }
}
