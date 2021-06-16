package action;

import com.mycompany.spiritus.metier.model.Client;
import com.mycompany.spiritus.metier.service.PlanningService;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetPredictionAction extends Action{
    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {
        
        PlanningService planningService = new PlanningService();
        
        int love = Integer.parseInt(request.getParameter("loveNumber"));
        int health = Integer.parseInt(request.getParameter("healthNumber"));
        int job = Integer.parseInt(request.getParameter("jobNumber"));
        
        Client client = planningService.getClient(Long.parseLong(request.getParameter("idClient")));
        List<String> prediction = planningService.getPrediction(client, love, health, job);
        
        request.setAttribute("prediction", prediction);
    }
}
