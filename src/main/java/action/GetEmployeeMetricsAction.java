package action;

import com.mycompany.spiritus.metier.model.Consultation;
import com.mycompany.spiritus.metier.service.*;

import com.mycompany.spiritus.metier.model.Employee;
import com.mycompany.spiritus.metier.model.Person;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import static javax.servlet.http.HttpServletResponse.SC_FORBIDDEN;
import static javax.servlet.http.HttpServletResponse.SC_OK;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import javax.servlet.http.HttpSession;

public class GetEmployeeMetricsAction extends Action{
    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        request.setCharacterEncoding("UTF-8");
        
        // check if connected
        if (session == null) {
            request.setAttribute("status", SC_FORBIDDEN);
            return;
        }
        
       PlanningService service = new PlanningService();
        /* Person person = service.getEmployee((Long)session.getAttribute("user"));

        // check if person is not an employee
        if (person instanceof Employee == false){
            request.setAttribute("status", SC_UNAUTHORIZED);
            return;
        }
        else {*/
            // Call services
           // Employee emp = (Employee) person;
            List<Object[]> topMediums = (List<Object[]>)service.getTopXMediums(10);
            HashMap<Employee, Long> topEmployee = (HashMap<Employee, Long>)service.getNbClientsByEmployee();
            
            request.setAttribute("status", SC_OK);
            request.setAttribute("topMediums", topMediums);
            System.out.println(topMediums.toString());
            request.setAttribute("topEmployee", topEmployee);
        //}
    }
}
