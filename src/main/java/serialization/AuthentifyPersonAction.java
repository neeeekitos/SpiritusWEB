package serialization;

import action.Action;

import javax.servlet.http.HttpServletRequest;

public class AuthentifyPersonAction extends Action {


    @Override
    public void execute(HttpServletRequest request) {
        // Récupération des Paramètres de la Requête
        String login = request.getParameter("login");
        String password = request.getParameter("password");

        // Instanciation de la classe de Service
        ServiceScolarite service = new ServiceScolarite();
        // Appel des Services Métiers (= méthodes de la classe de Service)
        List<Etudiant> listeEtudiants = service.listerEtudiantsParPromotion(promo);
        Float mixite = service.calculerMixiteParPromotion(promo);
        // Stockage des Résultats dans les Attributs de la Requête
        request.setAttribute("promo", promo);
        request.setAttribute("etudiants", listeEtudiants);
        request.setAttribute("mixite", mixite);
    }
}
