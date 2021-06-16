package action;

import com.mycompany.spiritus.metier.model.Medium;
import com.mycompany.spiritus.metier.service.PlanningService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetAllMediumsAction extends Action {

    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {

        PlanningService planningService = new PlanningService();

        List<Medium> mediumList = planningService.getAllMediums();
        if(mediumList == null){
            System.out.println("Une erreur est survenue côté serveur, la liste des médiums n'a pas pu être chargée.");
        }
        else{
            request.setAttribute("mediumList", mediumList);
        }
    }

}
