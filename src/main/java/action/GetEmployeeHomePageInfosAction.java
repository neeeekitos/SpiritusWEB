package action;

import com.mycompany.spiritus.metier.model.Consultation;
import com.mycompany.spiritus.metier.model.Employee;
import com.mycompany.spiritus.metier.model.Person;
import com.mycompany.spiritus.metier.service.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
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
        Person person = service.getEmployee((Long)session.getAttribute("user"));
        System.out.println(person);
        // check if person is not an employee
        if (person instanceof Employee == false){
            request.setAttribute("status", SC_UNAUTHORIZED);
            return;
        }
        else {
            Consultation consultation = service.getPendingConsultationForEmployee(person);
            List<Consultation> consultations = service.getEmployeeConsultationHistory(person);
            request.setAttribute("status", SC_OK);
            request.setAttribute("person", person);
            request.setAttribute("pendingConsultation", consultation);
            request.setAttribute("historiqueConsultation", consultations);
        }
        // Call services
        
        
       
    }
}
