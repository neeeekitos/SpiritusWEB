package action;

import com.mycompany.spiritus.metier.model.Medium;
import com.mycompany.spiritus.metier.service.PlanningService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetTopXMediumsAction extends Action {

    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {

        PlanningService planningService = new PlanningService();
        int nbMediums = Integer.parseInt(request.getParameter("nbMediums"));

        if (nbMediums == -1) nbMediums = 99;

        List<Object[]> mediumList = planningService.getTopXMediums(nbMediums);
        if(mediumList == null){
            System.out.println("Une erreur est survenue côté serveur, le top 5 médiums n'a pas pu être chargé.");
        }
        else{
            request.setAttribute("mediumList", mediumList);
        }
    }

}
