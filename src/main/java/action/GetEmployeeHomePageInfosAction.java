package action;

import com.mycompany.spiritus.metier.model.Consultation;
import com.mycompany.spiritus.metier.model.Employee;
import com.mycompany.spiritus.metier.model.Person;
import com.mycompany.spiritus.metier.service.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import static javax.servlet.http.HttpServletResponse.SC_FORBIDDEN;
import static javax.servlet.http.HttpServletResponse.SC_OK;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import javax.servlet.http.HttpSession;

public class GetEmployeeHomePageInfosAction extends Action{
    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {
        // get session 
        HttpSession session = request.getSession();
        
        // format
        request.setCharacterEncoding("UTF-8");
        
        // check if connected
        if (session == null) {
            request.setAttribute("status", SC_FORBIDDEN);
            return;
        }
      
        PlanningService service = new PlanningService();

        Employee employee = service.getEmployee((Long) session.getAttribute("personId"));
        System.out.println(employee);
        // check if person is not an employee
        if (employee == null) {
            request.setAttribute("status", SC_UNAUTHORIZED);
            return;
        }
        else {
            // Call services
            Consultation consultationPending = (Consultation) service.getPendingConsultationForEmployee(employee);
            Consultation consultationInProgress = (Consultation) service.getInProgressConsultationForEmployee(employee);
            List<Consultation> consultations = (List<Consultation>) service.getEmployeeConsultationHistory(employee);
            HashMap<Employee, Long> topFiveEmployee = (HashMap<Employee, Long>)service.getNbClientsByEmployee();
            request.setAttribute("status", SC_OK);
            request.setAttribute("person", employee);
            request.setAttribute("pendingConsultation", consultationPending);
            request.setAttribute("inProgressConsultation", consultationInProgress);
            request.setAttribute("historiqueConsultation", consultations);
            request.setAttribute("topEmployee", topFiveEmployee);

        }
    }
}
