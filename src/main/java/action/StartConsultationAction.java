package action;

import com.mycompany.spiritus.metier.service.AccountService;
import com.mycompany.spiritus.metier.service.PlanningService;
import com.mycompany.spiritus.metier.service.ServiceFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

import static javax.servlet.http.HttpServletResponse.SC_FORBIDDEN;

public class StartConsultationAction extends Action{
    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {

        HttpSession session = request.getSession(false);
        request.setCharacterEncoding("UTF-8");

        // check if user has been already connected
        if (session == null) {
            request.setAttribute("status", SC_FORBIDDEN);
            return;
        }

        PlanningService planningService = (PlanningService) ServiceFactory.buildService("Planinng");


    }
}
