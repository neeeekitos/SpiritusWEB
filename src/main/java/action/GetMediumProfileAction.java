package action;

import com.mycompany.spiritus.metier.model.Medium;
import com.mycompany.spiritus.metier.service.PlanningService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetMediumProfileAction extends Action{
    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {

        PlanningService planningService = new PlanningService();
        Long mediumId = Long.parseLong(request.getParameter("mediumId"));

        Medium medium = planningService.getMedium(mediumId);
        if(medium == null){
            System.out.println("Une erreur est survenue côté serveur, le médium n'a pas pu être chargé.");
        }
        else{
            request.setAttribute("mediumList", medium);
        }
    }
}
