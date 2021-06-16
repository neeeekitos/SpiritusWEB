package action;

import com.mycompany.spiritus.metier.model.Consultation;
import com.mycompany.spiritus.metier.model.Employee;
import com.mycompany.spiritus.metier.service.PlanningService;
import com.mycompany.spiritus.metier.service.ServiceFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

import static com.mycompany.spiritus.metier.model.Consultation.Status.REALIZED;
import static javax.servlet.http.HttpServletResponse.*;

public class FinishConsultationAction extends Action{
    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {

        HttpSession session = request.getSession(false);
        request.setCharacterEncoding("UTF-8");
        String comment = (String) request.getAttribute("comment");

        // check if user has been already connected
        if (session == null || session.getAttribute("user") == null) {
            request.setAttribute("status", SC_FORBIDDEN);
            return;
        }

        Long sessionUserId = (Long) session.getAttribute("personId");

        PlanningService planningService = (PlanningService) ServiceFactory.buildService("Planinng");
        Employee employee = planningService.getEmployee(sessionUserId);

        Consultation consultation = planningService.getPendingConsultationForEmployee(employee);
        if (consultation != null) {
            System.out.println("Pending consultation " + consultation.toString());
            consultation.setStatus(REALIZED);
            consultation.setComment(comment);
            request.setAttribute("status", SC_OK);
        } else System.out.println("Consultation nulle !!!!!!!!");
        request.setAttribute("status", SC_BAD_REQUEST);
    }
}
